const { Router } = require('express');

const { tdsEditoras, criaEditora, editoraPorId, atlzEditora, delEditora } = require('../controllers/editoraController');
const validaEditora = require('../middleware/validaEditora');
const { validaId } = require('../middleware/validaId');

const editoraRouter = Router();

editoraRouter.get('/', tdsEditoras);

editoraRouter.post('/', validaEditora, criaEditora);

editoraRouter.use(validaId);

editoraRouter.get('/:id', editoraPorId);

editoraRouter.put('/:id', validaEditora, atlzEditora);

editoraRouter.delete('/:id', delEditora);

module.exports = editoraRouter;
