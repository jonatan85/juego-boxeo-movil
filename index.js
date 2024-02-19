const express = require('express');

const characterRouter = require('./routes/character.routes');
const  connect = require('./utils/db/connect.js');

connect();

const PORT = 3000;
const server = express();

server.use('/character', characterRouter);

server.listen(PORT, () => {
    console.log(`El servidor esta escuchado en http://localhost:${PORT}`);
});