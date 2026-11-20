function Header({ cantidadCarrito }) {
    return (
        <header className="header">
            <h1>Cool Studio</h1>
            <span className="header__carrito">Carrito: {cantidadCarrito}</span>
        </header>
    );
}

export default Header;