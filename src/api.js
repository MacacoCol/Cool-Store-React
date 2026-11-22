import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
});

export function mensajeDeError(error) {
    return (
        error.response?.data?.error ??
        error.message ??
        "Ocurrió un error inesperado"
    );
}

// ---------- Productos ----------
export async function obtenerProductos() {
    const { data } = await api.get("/productos");
    return data;
}

export async function crearProducto(producto) {
    const { data } = await api.post("/productos", producto);
    return data;
}

export async function actualizarProducto(id, producto) {
    const { data } = await api.put(`/productos/${id}`, producto);
    return data;
}

export async function eliminarProducto(id) {
    await api.delete(`/productos/${id}`);
}

// ---------- Categorías ----------
export async function obtenerCategorias() {
    const { data } = await api.get("/categorias");
    return data;
}

export async function crearCategoria(categoria) {
    const { data } = await api.post("/categorias", categoria);
    return data;
}

export async function eliminarCategoria(id) {
    await api.delete(`/categorias/${id}`);
}