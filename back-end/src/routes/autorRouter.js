const { Router } = require('express');

const { tdsAutores, autorId, criaAutor, atlizAutor, delAutor } = require('../controllers/autorController');
const { validaAutor } = require('../middleware/validaAutor');

const autorRouter = Router();

autorRouter.get('/', tdsAutores);

autorRouter.get('/:id', autorId);

autorRouter.post('/', validaAutor, criaAutor);

autorRouter.put('/:id', validaAutor, atlizAutor);

autorRouter.delete('/:id', delAutor);

module.exports = autorRouter;