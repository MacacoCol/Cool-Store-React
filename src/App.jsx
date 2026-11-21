import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./componentes/Header";
import Catalogo from "./componentes/Catalogo";
import Categorias from "./componentes/Categorias";
import Productos from "./componentes/Productos";
import Carrito from "./componentes/Carrito";

function App() {
  const [carrito, setCarrito] = useState([]);

  function agregar(camisa) {
    setCarrito((actual) => {
      const existente = actual.find(
          (item) => item.idProducto === camisa.idProducto
      );
      if (existente) {
        return actual.map((item) =>
            item.idProducto === camisa.idProducto
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
        );
      }
      return [
        ...actual,
        {
          idProducto: camisa.idProducto,
          nombre: camisa.nombre,
          precio: camisa.precio,
          cantidad: 1,
        },
      ];
    });
  }

  const cantidadTotal = carrito.reduce((suma, item) => suma + item.cantidad, 0);

  return (
      <>
        <Header cantidadCarrito={cantidadTotal} />
        <main className="contenido">
          <Routes>
            <Route
                path="/"
                element={
                  <>
                    <Catalogo onAgregar={agregar} />
                    <Carrito items={carrito} onVaciar={() => setCarrito([])} />
                  </>
                }
            />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/admin/productos" element={<Productos />} />
            <Route path="*" element={<p>Página no encontrada.</p>} />
          </Routes>
        </main>
      </>
  );
}

export default App;