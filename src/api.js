const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";

export async function obtenerProductos() {
    const respuesta = await fetch(`${API_URL}/productos`);
    if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status} al pedir los productos`);
    }
    return respuesta.json();
}