const express = require('express');
const Boxeadores = require('../models/Boxeadores.js');

const isAuthPassport = require('../utils/middleware/auth-passport.middleware.js');

const boxeadoresRouter = express.Router();

boxeadoresRouter.get('/', async (req, res, next) => {
    try {
        const boxeadores = await Boxeadores.find();
        return res.status(200).json({
            boxeadores, 
            user: req.user
        });
    } catch(err) {
        next(err);
    }
});


boxeadoresRouter.get('/:id', [isAuthPassport], async (req, res, next) => {
    const id = req.params.id;
    try {
        const boxeadores = await Boxeadores.findById(id);
        if (boxeadores) {
            return res.status(200).json(boxeadores);
        } else {
            next(createError('No existe el boxeador con el id indicado', 404));
        }
    } catch (err) {
        next(err);
    }
  });


boxeadoresRouter.post('/', async (req, res, next) => {
    try {
        const newBoxeador = new Boxeadores({...req.body});
        const createdBoxeadores = await newBoxeador.save();
        return res.status(201).json(createdBoxeadores);
    } catch (err) {
        next(err);
    }
});

boxeadoresRouter.put('/:id', async (req, res, next) => {
    try {
       const id = req.params.id;
       const modifiedBoxeadores = new Boxeadores({...req.body});
       //Para que no genere un id aleatorio y lo deje como fijo.
       modifiedBoxeadores.id = id;
       // Para actualizar, Pero no me cambia los datos de la movie.
       const boxeadoresUpdate = await Boxeadores.findByIdAndUpdate(
          id,
          modifiedBoxeadores,
          //Añado new = true para que me traiga la movie con los cambios realizados.
          {new: true}
       );
       // Por ultimo el estatus json + paramatro
       return res.status(200).json(boxeadoresUpdate);
    }catch (err) {
       next(err);
    }
});

boxeadoresRouter.delete('/:id', async (req, res, next) => {
    try{  
       const id = req.params.id;
       await Boxeadores.findByIdAndDelete(id);
       return res.status(200).json('El boxeador se a eliminado correctamente.')
    } catch(err) {
       next(err);
    }
  });

module.exports = boxeadoresRouter;