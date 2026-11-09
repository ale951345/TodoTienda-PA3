
# TodoTienda - Proyecto PA3

## 1. Descripción
TodoTienda es una aplicación web para gestionar productos de una tienda. Permite registrar, consultar, actualizar y eliminar productos. En esta versión se incorporan autenticación, autorización por roles y un panel secundario desarrollado en React.

## 2. Tecnologías utilizadas
- Angular y TypeScript.
- React y TypeScript.
- Node.js y Express.
- MongoDB y Mongoose.
- JWT y bcrypt.
- Axios y Context API.

## 3. Estructura del proyecto
- `todotienda/`: aplicación principal desarrollada en Angular.
- `react-todotienda/`: panel secundario desarrollado en React.
- `backend/`: API REST y conexión con MongoDB.
- `CHANGELOG.md`: registro de cambios.
- `.env.example`: ejemplo de configuración del backend.

## 4. Funcionalidades
- Registro e inicio de sesión.
- Autenticación mediante JWT.
- Contraseñas protegidas con bcrypt.
- Roles de administrador y usuario.
- Gestión de productos mediante CRUD.
- Rutas protegidas.
- Conexión de Angular y React al mismo backend.

## 5. Instalación y ejecución

### Backend
1. Ingresar a la carpeta `backend`.
2. Ejecutar `npm install`.
3. Configurar las variables de entorno tomando como referencia `.env.example`.
4. Ejecutar `npm run dev`.

### Angular
1. Ingresar a la carpeta `todotienda`.
2. Ejecutar `npm install`.
3. Ejecutar `ng serve`.

### React
1. Ingresar a la carpeta `react-todotienda`.
2. Ejecutar `npm install`.
3. Ejecutar `npm run dev`.

## 6. Direcciones locales
- Backend: http://localhost:3000
- Angular: http://localhost:4200
- React: http://localhost:5173

## 7. Base de datos
La aplicación utiliza MongoDB para almacenar los usuarios y productos de manera persistente.

## 8. Seguridad
Las contraseñas se protegen mediante bcrypt y la autenticación utiliza JWT. Las operaciones administrativas están restringidas según el rol del usuario.
