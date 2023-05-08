const { Router } = require('express');


const livrosRouter = Router();

livrosRouter.get('/', (req, res) => {
  res.json({ message: 'livros'});
});

livrosRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `livros por id: ${id}`});
});

livrosRouter.post('/', (req, res) => {});

livrosRouter.put('/:id', (req, res) => {});

livrosRouter.patch('/:id', (req, res) => {});

livrosRouter.delete('/:id', (req, res) => {});

module.exports = livrosRouter;