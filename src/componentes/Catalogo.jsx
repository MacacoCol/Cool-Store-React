import { useEffect, useState } from "react";
import { obtenerProductos } from "../api";
import Buscador from "./Buscador";
import CamisaCard from "./CamisaCard";
import { obtenerProductos, mensajeDeError } from "../api";

function Catalogo({ onAgregar }) {
    const [camisas, setCamisas] = useState([]);
    const [texto, setTexto] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        obtenerProductos()
            .then((datos) => setCamisas(datos))
            .catch((e) => setError(mensajeDeError(e)))
            .finally(() => setCargando(false));
    }, []);

    const visibles = camisas.filter((camisa) =>
        camisa.nombre.toLowerCase().includes(texto.toLowerCase())
    );

    if (cargando) {
        return <p>Cargando camisetas...</p>;
    }

    if (error) {
        return <p className="error">No se pudo cargar el catálogo: {error}</p>;
    }

    return (
        <section>
            <Buscador
                texto={texto}
                onCambiar={setTexto}
                onLimpiar={() => setTexto("")}
            />
            <div className="rejilla">
                {visibles.map((camisa) => (
                    <CamisaCard
                        key={camisa.idProducto}
                        camisa={camisa}
                        onAgregar={onAgregar}
                    />
                ))}
            </div>
            {visibles.length === 0 && <p>No hay camisetas con ese nombre.</p>}
        </section>
    );
}

export default Catalogo;