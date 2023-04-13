const { Router } = require('express');


const autorRouter = Router();

autorRouter.get('/', (req, res) => {
    res.json({ message: 'autor'});
});

autorRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `autor por id: ${id}`});
});

autorRouter.post('/', (req, res) => {});

autorRouter.put('/:id', (req, res) => {});

autorRouter.patch('/:id', (req, res) => {});

autorRouter.delete('/:id', (req, res) => {});

module.exports = autorRouter;