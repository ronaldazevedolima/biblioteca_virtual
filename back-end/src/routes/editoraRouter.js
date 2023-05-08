const { Router } = require('express');

const { tdsEditoras, criaEditora, editoraPorId, atlzEditora, delEditora } = require('../controllers/editoraController');


const editoraRouter = Router();

editoraRouter.get('/', tdsEditoras);

editoraRouter.get('/:id', editoraPorId);

editoraRouter.post('/', criaEditora);

editoraRouter.put('/:id', atlzEditora);

editoraRouter.delete('/:id', delEditora);

module.exports = editoraRouter;
