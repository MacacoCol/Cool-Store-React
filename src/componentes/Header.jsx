import { NavLink } from "react-router-dom";

function Header({ cantidadCarrito }) {
    return (
        <header className="header">
            <h1>Cool Studio</h1>
            <nav className="menu">
                <NavLink to="/" end>
                    Tienda
                </NavLink>
                <NavLink to="/categorias">Categorías</NavLink>
                <NavLink to="/admin/productos">Productos</NavLink>
            </nav>
            <span className="header__carrito">Carrito: {cantidadCarrito}</span>
        </header>
    );
}

export default Header;