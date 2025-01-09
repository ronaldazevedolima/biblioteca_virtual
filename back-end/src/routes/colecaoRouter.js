const { Router } = require('express');

const { tdsColecoes, colecaoId, criaColecao, atlizColecao, delColecao } = require('../controllers/colecaoController');
const validaColecao = require('../middleware/validaColecao');

const colecaoRouter = Router();

colecaoRouter.get('/', tdsColecoes);

colecaoRouter.get('/:id', colecaoId);

colecaoRouter.post('/', validaColecao, criaColecao);

colecaoRouter.put('/:id', validaColecao, atlizColecao);

colecaoRouter.delete('/:id', delColecao);

module.exports = colecaoRouter;
