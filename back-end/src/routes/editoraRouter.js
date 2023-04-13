const { Router } = require('express');


const editoraRouter = Router();

editoraRouter.get('/', (req, res) => {
    res.json({ message: 'editora'});
});

editoraRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.json({ message: `editora por id: ${id}`});
});

editoraRouter.post('/', (req, res) => {});

editoraRouter.put('/:id', (req, res) => {});

editoraRouter.patch('/:id', (req, res) => {});

editoraRouter.delete('/:id', (req, res) => {});

module.exports = editoraRouter;