function Buscador({ texto, onCambiar, onLimpiar }) {
    return (
        <div className="buscador">
            <input
                type="text"
                placeholder="Buscar camiseta..."
                value={texto}
                onChange={(evento) => onCambiar(evento.target.value)}
            />
            <button type="button" onClick={onLimpiar}>
                Limpiar
            </button>
        </div>
    );
}

export default Buscador;