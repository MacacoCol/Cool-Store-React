# Cool Store React

Front en React de la tienda de camisetas **Cool Studio**. Consume la API REST de `Cool-Store-API`.
Proyecto formativo ADSO – SENA (ficha 3186696).

## Tecnologías
- React + Vite
- React Router
- Axios
- SweetAlert2

## Requisitos
- Node.js
- La API corriendo en http://localhost:8080 (ver repo del backend)

## Cómo ejecutarlo
```bash
npm install
npm run dev
```
Abrir la URL que muestre Vite (normalmente http://localhost:5173).

Opcional: crear un archivo `.env` con la URL de la API:
```
VITE_API_URL=http://localhost:8080/api
```

## Páginas
| Ruta | Descripción |
|---|---|
| `/` | Catálogo con buscador y carrito |
| `/categorias` | Listar, crear y eliminar categorías |
| `/admin/productos` | Crear, editar y eliminar productos |

## Repositorios del proyecto
| Repositorio | Descripción |
|---|---|
| [Cool-Store-React](https://github.com/MacacoCol/Cool-Store-React) | Front en React (este repo) |
| [Cool-Store-API](https://github.com/MacacoCol/Cool-Store-API) | Backend Spring Boot + MariaDB |
| [Cool-Store-Sena-](https://github.com/MacacoCol/Cool-Store-Sena-) | Front inicial en HTML, CSS y JavaScript |

## Autor
Santiago García Castañeda