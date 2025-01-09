const { Router } = require('express');

const { tdsCategorias, categoriaId, criaCategoria, atlizCategoria, delCategoria } = require('../controllers/categoriaController');
const validaCategoria = require('../middleware/validaCategoria');

const categoriaRouter = Router();

categoriaRouter.get('/', tdsCategorias);

categoriaRouter.get('/:id', categoriaId);

categoriaRouter.post('/', validaCategoria, criaCategoria);

categoriaRouter.put('/:id', validaCategoria, atlizCategoria);

categoriaRouter.delete('/:id', delCategoria );

module.exports = categoriaRouter;