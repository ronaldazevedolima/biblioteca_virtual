const { Router } = require('express');
const {
  tdsLivros,
  livrosNaoLidos,
  livroPorId,
  livrosNaoTenho,
  criaLivro,
  atlzLivro,
  delLivro,
  atlizLido,
  procuraLivro 
} = require('../controllers/livrosController');

const { validaLivros, validaExistenciaCampos, validaPutLivros } = require('../middleware/validaLivros');

const livrosRouter = Router();


livrosRouter.get('/', tdsLivros);
// sem parametros retorna todos os livros
livrosRouter.get('/search', procuraLivro);

livrosRouter.get('/nao-lidos', livrosNaoLidos);

livrosRouter.get('/nao-tenho', livrosNaoTenho);

livrosRouter.get('/:id', livroPorId);

livrosRouter.post('/', validaLivros, validaExistenciaCampos, criaLivro);

livrosRouter.put('/:id',validaExistenciaCampos,validaPutLivros, atlzLivro);

livrosRouter.patch('/:id', atlizLido);

livrosRouter.delete('/:id', delLivro);

module.exports = livrosRouter;