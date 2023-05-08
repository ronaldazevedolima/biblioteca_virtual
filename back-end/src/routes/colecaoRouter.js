const { Router } = require('express');

const { tdsColecoes, colecaoId, criaColecao, atlizColecao, delColecao } = require('../controllers/colecaoController');


const colecaoRouter = Router();

colecaoRouter.get('/', tdsColecoes);

colecaoRouter.get('/:id', colecaoId);

colecaoRouter.post('/', criaColecao);

colecaoRouter.put('/:id', atlizColecao);

colecaoRouter.patch('/:id', delColecao);

colecaoRouter.delete('/:id', );

module.exports = colecaoRouter;
