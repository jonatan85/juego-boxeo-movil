// Se importan los módulos necesarios
const express = require('express'); // Express para la gestión de la aplicación web
const cors = require('cors'); // CORS para permitir solicitudes desde diferentes dominios
const passport = require('passport'); // Passport para la autenticación de usuarios
const session = require('express-session'); // express-session para gestionar sesiones de usuario
const MongoStore = require('connect-mongo');
const DB_URL = "mongodb+srv://root:55hJkNFETwtUGAtl@joni.auofi0k.mongodb.net/?retryWrites=true&w=majority";


// Se importan los enrutadores de la aplicación
const boxeadoresRouter = require('./routes/boxeadores.routes.js'); // Enrutador para las rutas relacionadas con los boxeadores
const connect = require('./utils/db/connect.js'); // Función para conectar a la base de datos
const userRouter = require('./routes/user.routes.js'); // Enrutador para las rutas relacionadas con los usuarios

// Se conecta a la base de datos
connect();

// Se establece el puerto de escucha del servidor, utilizando el puerto especificado por el entorno o el puerto 4000 por defecto
const PORT = process.env.PORT || 4000;

// Se crea una instancia de la aplicación Express
const server = express();

// Middleware para permitir solicitudes CORS
server.use(cors());

// Middleware para parsear solicitudes POST y PUT en formato JSON
server.use(express.json());

// Middleware para parsear solicitudes POST y PUT en formato STRING o ARRAY
server.use(express.urlencoded({ extended: false }));

// Configuración de passport
require('./utils/authentication/passport.js');

// Configuración de la gestión de sesiones
server.use(session({
    secret: 'hola_joni', // Clave secreta para cifrar las cookies de sesión
    resave: false, // Evita que se guarde la sesión en cada petición
    saveUninitialized: false, // Evita que se guarde la sesión para las peticiones sin cambios
    cookie: {
        maxAge: 60000 // Tiempo de vida máximo de la cookie de sesión (en milisegundos)
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })
}));

// Inicialización de passport
server.use(passport.initialize());

// Utilizamos la sesión con passport
server.use(passport.session());

// Ruta de bienvenida para la raíz del servidor
server.get('/', (req, res) => {
    res.json("¡Bienvenido a mi ring!"); // Se devuelve un mensaje de bienvenida en formato JSON
});

// Rutas para la gestión de usuarios y boxeadores
server.use('/users', userRouter); // Rutas relacionadas con los usuarios
server.use('/boxeadores', boxeadoresRouter); // Rutas relacionadas con los boxeadores

// El servidor comienza a escuchar las solicitudes en el puerto especificado
server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});
