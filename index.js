const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = "mongodb+srv://root:55hJkNFETwtUGAtl@joni.auofi0k.mongodb.net/?retryWrites=true&w=majority";

const boxeadoresRouter = require('./routes/boxeadores.routes.js');
const connect = require('./utils/db/connect.js');
const userRouter = require('./routes/user.routes.js');

connect();

const PORT = process.env.PORT || 4000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

require('./utils/authentication/passport.js');

server.use(session({
    secret: 'hola_joni',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })
}));

server.use(passport.initialize());
server.use(passport.session());

server.get('/', (req, res) => {
    res.json("¡Bienvenido a mi ring!");
});

server.use('/users', userRouter);
server.use('/boxeadores', boxeadoresRouter);

server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
});
