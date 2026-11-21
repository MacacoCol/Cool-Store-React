import axios from "axios";

const cliente = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api",
});

export function mensajeDeError(error) {
    return error.response?.data?.error ?? "No se pudo conectar con el servidor";
}

export async function obtenerProductos() {
    const respuesta = await cliente.get("/productos");
    return respuesta.data;
}

export async function obtenerCategorias() {
    const respuesta = await cliente.get("/categorias");
    return respuesta.data;
}

export async function crearCategoria(categoria) {
    const respuesta = await cliente.post("/categorias", categoria);
    return respuesta.data;
}

export async function eliminarCategoria(id) {
    await cliente.delete(`/categorias/${id}`);
}