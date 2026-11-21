import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    obtenerCategorias,
    crearCategoria,
    eliminarCategoria,
    mensajeDeError,
} from "../api";

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        obtenerCategorias()
            .then((datos) => setCategorias(datos))
            .catch((e) => Swal.fire("Error", mensajeDeError(e), "error"));
    }, []);

    async function refrescar() {
        setCategorias(await obtenerCategorias());
    }

    async function guardar(evento) {
        evento.preventDefault();
        if (nombre.trim() === "") {
            return;
        }
        try {
            await crearCategoria({
                nombre: nombre.trim(),
                descripcion: descripcion.trim(),
            });
            setNombre("");
            setDescripcion("");
            await refrescar();
            Swal.fire("Listo", "Categoría creada", "success");
        } catch (e) {
            Swal.fire("Error", mensajeDeError(e), "error");
        }
    }

    async function borrar(categoria) {
        const respuesta = await Swal.fire({
            title: `¿Eliminar "${categoria.nombre}"?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });
        if (!respuesta.isConfirmed) {
            return;
        }
        try {
            await eliminarCategoria(categoria.idCategoria);
            await refrescar();
            Swal.fire("Eliminada", "La categoría se eliminó", "success");
        } catch (e) {
            Swal.fire("No se pudo eliminar", mensajeDeError(e), "error");
        }
    }

    return (
        <section className="categorias">
            <h2>Categorías</h2>

            <ul>
                {categorias.map((categoria) => (
                    <li key={categoria.idCategoria}>
            <span>
              <strong>{categoria.nombre}</strong> - {categoria.descripcion}
            </span>
                        <button type="button" onClick={() => borrar(categoria)}>
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>

            <form onSubmit={guardar}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(evento) => setNombre(evento.target.value)}
                />
                <input
                    type="text"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(evento) => setDescripcion(evento.target.value)}
                />
                <button type="submit">Crear categoría</button>
            </form>
        </section>
    );
}

export default Categorias;