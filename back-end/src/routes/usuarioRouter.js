const { Router } = require('express');

const userController = require('../controllers/usuarioController');


const usuarioRouter = Router();

usuarioRouter.get('/', userController.tdsUsrs);

usuarioRouter.get('/:id', userController.usrId);

usuarioRouter.post('/', userController.criaUsr);

usuarioRouter.put('/:id', userController.atlizUsuario);

usuarioRouter.patch('/:id', userController.atlzClassficacao);

usuarioRouter.delete('/:id', userController.delUsr);

module.exports = usuarioRouter;