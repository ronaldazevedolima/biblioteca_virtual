const { Router } = require('express');

const { tdsCategorias, categoriaId, criaCategoria, atlizCategoria, delCategoria } = require('../controllers/categoriaController');
const validaCategoria = require('../middleware/validaCategoria');
const { validaId } = require('../middleware/validaId');

const categoriaRouter = Router();

categoriaRouter.get('/', tdsCategorias);

categoriaRouter.post('/', validaCategoria, criaCategoria);

categoriaRouter.use('/:id', validaId);

categoriaRouter.get('/:id', categoriaId);

categoriaRouter.put('/:id', validaCategoria, atlizCategoria);

categoriaRouter.delete('/:id', delCategoria );

module.exports = categoriaRouter;