const { Router } = require('express');
const { tdsLivros, livroPorId, criaLivro, atlzLivro, delLivro } = require('../controllers/livrosController');

const { validaLivros, validaExistenciaCampos } = require('../middleware/validaLivros');

const livrosRouter = Router();

livrosRouter.get('/', tdsLivros);

livrosRouter.get('/:id', livroPorId);

// acabei de fazer a validação dos campos, tanto no formato como na existencia
livrosRouter.post('/', validaLivros, validaExistenciaCampos, criaLivro);

livrosRouter.put('/:id', atlzLivro);

// livrosRouter.patch('/:id', );

livrosRouter.delete('/:id', delLivro);

module.exports = livrosRouter;