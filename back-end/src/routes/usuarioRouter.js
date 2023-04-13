const { Router } = require('express');


const usuarioRouter = Router();

usuarioRouter.get('/', (req, res) => {
    res.json({ message: 'usuario'});
});

usuarioRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `usuario por id: ${id}`});
});

usuarioRouter.post('/', (req, res) => {});

usuarioRouter.put('/:id', (req, res) => {});

usuarioRouter.patch('/:id', (req, res) => {});

usuarioRouter.delete('/:id', (req, res) => {});

module.exports = usuarioRouter;