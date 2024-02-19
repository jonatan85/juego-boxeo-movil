const mongoose = require('mongoose');

const boxeadoresSchema = new mongoose.Schema(
    {
        nombre: String,
        edad: Number,
        tipo: String,
        imagen: String
    }
);

const Boxeadores = mongoose.model('Boxeadores', boxeadoresSchema);

module.exports = Boxeadores;