import { useState } from "react";
import { formatoCOP } from "../formato";

function Carrito({ items, onVaciar }) {
    const [correo, setCorreo] = useState("");
    const [enviado, setEnviado] = useState(false);

    const total = items.reduce(
        (suma, item) => suma + item.precio * item.cantidad,
        0
    );

    function enviar(evento) {
        evento.preventDefault();
        if (correo.trim() === "") {
            return;
        }
        setEnviado(true);
        setCorreo("");
        onVaciar();
    }

    return (
        <section className="carrito">
            <h2>Carrito</h2>

            {enviado && items.length === 0 && <p>¡Pedido enviado! Gracias por tu compra.</p>}
            {!enviado && items.length === 0 && <p>El carrito está vacío.</p>}

            {items.length > 0 && (
                <>
                    <ul>
                        {items.map((item) => (
                            <li key={item.idProducto}>
                                {item.nombre} x {item.cantidad} -{" "}
                                {formatoCOP(item.precio * item.cantidad)}
                            </li>
                        ))}
                    </ul>
                    <p>
                        <strong>Total: {formatoCOP(total)}</strong>
                    </p>
                    <button type="button" onClick={onVaciar}>
                        Vaciar carrito
                    </button>
                    <form onSubmit={enviar}>
                        <input
                            type="email"
                            placeholder="Tu correo"
                            value={correo}
                            onChange={(evento) => setCorreo(evento.target.value)}
                        />
                        <button type="submit">Enviar pedido</button>
                    </form>
                </>
            )}
        </section>
    );
}

export default Carrito;