import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    obtenerProductos,
    obtenerCategorias,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    mensajeDeError,
} from "../api";
import { formatoCOP } from "../formato";

const FORMULARIO_VACIO = {
    nombre: "",
    descripcion: "",
    precio: "",
    idCategoria: "",
};

function Productos() {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [formulario, setFormulario] = useState(FORMULARIO_VACIO);
    const [editandoId, setEditandoId] = useState(null);

    useEffect(() => {
        Promise.all([obtenerProductos(), obtenerCategorias()])
            .then(([listaProductos, listaCategorias]) => {
                setProductos(listaProductos);
                setCategorias(listaCategorias);
            })
            .catch((e) => Swal.fire("Error", mensajeDeError(e), "error"));
    }, []);

    async function refrescar() {
        setProductos(await obtenerProductos());
    }

    function cambiar(evento) {
        const { name, value } = evento.target;
        setFormulario({ ...formulario, [name]: value });
    }

    function editar(producto) {
        setEditandoId(producto.idProducto);
        setFormulario({
            nombre: producto.nombre,
            descripcion: producto.descripcion ?? "",
            precio: String(producto.precio),
            idCategoria: String(producto.categoria.idCategoria),
        });
    }

    function cancelar() {
        setEditandoId(null);
        setFormulario(FORMULARIO_VACIO);
    }

    async function guardar(evento) {
        evento.preventDefault();
        const datos = {
            nombre: formulario.nombre.trim(),
            descripcion: formulario.descripcion.trim(),
            precio: Number(formulario.precio),
            categoria: { idCategoria: Number(formulario.idCategoria) },
        };
        const esNuevo = editandoId === null;
        try {
            if (esNuevo) {
                await crearProducto(datos);
            } else {
                await actualizarProducto(editandoId, datos);
            }
            cancelar();
            await refrescar();
            Swal.fire(
                "Listo",
                esNuevo ? "Producto creado" : "Producto actualizado",
                "success"
            );
        } catch (e) {
            Swal.fire("Error", mensajeDeError(e), "error");
        }
    }

    async function borrar(producto) {
        const respuesta = await Swal.fire({
            title: `¿Eliminar "${producto.nombre}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!respuesta.isConfirmed) {
            return;
        }
        try {
            await eliminarProducto(producto.idProducto);
            await refrescar();
            Swal.fire("Eliminado", "El producto se eliminó", "success");
        } catch (e) {
            Swal.fire("No se pudo eliminar", mensajeDeError(e), "error");
        }
    }

    return (
        <section className="admin">
            <h2>Gestión de productos</h2>

            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {productos.map((producto) => (
                    <tr key={producto.idProducto}>
                        <td>{producto.nombre}</td>
                        <td>{producto.categoria?.nombre}</td>
                        <td>{formatoCOP(producto.precio)}</td>
                        <td className="acciones">
                            <button type="button" onClick={() => editar(producto)}>
                                Editar
                            </button>
                            <button type="button" onClick={() => borrar(producto)}>
                                Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <h3>{editandoId === null ? "Nuevo producto" : "Editar producto"}</h3>
            <form onSubmit={guardar}>
                <input
                    name="nombre"
                    placeholder="Nombre"
                    value={formulario.nombre}
                    onChange={cambiar}
                    required
                />
                <input
                    name="descripcion"
                    placeholder="Descripción"
                    value={formulario.descripcion}
                    onChange={cambiar}
                />
                <input
                    name="precio"
                    type="number"
                    min="1"
                    placeholder="Precio"
                    value={formulario.precio}
                    onChange={cambiar}
                    required
                />
                <select
                    name="idCategoria"
                    value={formulario.idCategoria}
                    onChange={cambiar}
                    required
                >
                    <option value="">Categoría...</option>
                    {categorias.map((categoria) => (
                        <option key={categoria.idCategoria} value={categoria.idCategoria}>
                            {categoria.nombre}
                        </option>
                    ))}
                </select>
                <button type="submit">
                    {editandoId === null ? "Crear producto" : "Guardar cambios"}
                </button>
                {editandoId !== null && (
                    <button type="button" onClick={cancelar}>
                        Cancelar
                    </button>
                )}
            </form>
        </section>
    );
}

export default Productos;