const { Router } = require('express');


const colecaoRouter = Router();

colecaoRouter.get('/', (req, res) => {
    res.json({ message: 'colecao'});
});

colecaoRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `colecao por id: ${id}`});
});

colecaoRouter.post('/', (req, res) => {});

colecaoRouter.put('/:id', (req, res) => {});

colecaoRouter.patch('/:id', (req, res) => {});

colecaoRouter.delete('/:id', (req, res) => {});

module.exports = colecaoRouter;