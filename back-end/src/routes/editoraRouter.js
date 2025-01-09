const { Router } = require('express');

const { tdsEditoras, criaEditora, editoraPorId, atlzEditora, delEditora } = require('../controllers/editoraController');
const validaEditora = require('../middleware/validaEditora');

const editoraRouter = Router();

editoraRouter.get('/', tdsEditoras);

editoraRouter.get('/:id', editoraPorId);

editoraRouter.post('/', validaEditora, criaEditora);

editoraRouter.put('/:id', validaEditora, atlzEditora);

editoraRouter.delete('/:id', delEditora);

module.exports = editoraRouter;
