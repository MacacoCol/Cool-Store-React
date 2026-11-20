import { formatoCOP } from "../formato";

function CamisaCard({ camisa, onAgregar }) {
    return (
        <article className="tarjeta">
            <span className="tarjeta__categoria">{camisa.categoria?.nombre}</span>
            <h3>{camisa.nombre}</h3>
            <p>{camisa.descripcion}</p>
            <strong>{formatoCOP(camisa.precio)}</strong>
            <button type="button" onClick={() => onAgregar(camisa)}>
                Agregar al carrito
            </button>
        </article>
    );
}

export default CamisaCard;