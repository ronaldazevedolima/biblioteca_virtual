const { Router } = require('express');


const categoriaRouter = Router();

categoriaRouter.get('/', (req, res) => {
    res.json({ message: 'categoria'});
});

categoriaRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `categoria por id: ${id}`});
});

categoriaRouter.post('/', (req, res) => {});

categoriaRouter.put('/:id', (req, res) => {});

categoriaRouter.patch('/:id', (req, res) => {});

categoriaRouter.delete('/:id', (req, res) => {});

module.exports = categoriaRouter;