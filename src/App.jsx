import { useState } from "react";
import Header from "./componentes/Header";
import Catalogo from "./componentes/Catalogo";
import Carrito from "./componentes/Carrito";
import Categorias from "./componentes/Categorias";
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
          <Catalogo onAgregar={agregar} />
          <Categorias />
          <Carrito items={carrito} onVaciar={() => setCarrito([])} />
        </main>
      </>
  );
}

export default App;