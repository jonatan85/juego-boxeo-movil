const express = require('express');
const Boxeadores = require('../models/Boxeadores.js');

const characterRouter = express.Router();

characterRouter.get('/', (req, res) => {
    res.send('Esta es la lista de personajes')
});

module.exports = characterRouter;