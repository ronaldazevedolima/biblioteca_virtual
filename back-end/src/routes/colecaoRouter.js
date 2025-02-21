const { Router } = require('express');

const { tdsColecoes, colecaoId, criaColecao, atlizColecao, delColecao } = require('../controllers/colecaoController');
const validaColecao = require('../middleware/validaColecao');
const { validaId } = require('../middleware/validaId');
const { validaToken } = require('../middleware/validaToken');

const colecaoRouter = Router();

colecaoRouter.get('/', tdsColecoes);

colecaoRouter.use(validaToken);

colecaoRouter.post('/', validaColecao, criaColecao);

colecaoRouter.use('/:id', validaId);

colecaoRouter.get('/:id', colecaoId);

colecaoRouter.put('/:id', validaColecao, atlizColecao);

colecaoRouter.delete('/:id', delColecao);

module.exports = colecaoRouter;
