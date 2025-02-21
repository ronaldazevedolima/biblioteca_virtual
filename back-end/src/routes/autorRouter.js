const { Router } = require('express');

const { tdsAutores, autorId, criaAutor, atlizAutor, delAutor } = require('../controllers/autorController');
const { validaAutor } = require('../middleware/validaAutor');
const { validaId } = require('../middleware/validaId');
const { validaToken } = require('../middleware/validaToken');

const autorRouter = Router();

autorRouter.get('/', tdsAutores);

autorRouter.use(validaToken);

autorRouter.post('/', validaAutor, criaAutor);

autorRouter.use('/:id', validaId);

autorRouter.get('/:id', autorId);

autorRouter.put('/:id', validaAutor, atlizAutor);

autorRouter.delete('/:id', delAutor);

module.exports = autorRouter;