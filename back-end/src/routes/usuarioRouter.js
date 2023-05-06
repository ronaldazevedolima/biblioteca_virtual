const { Router } = require('express');

const userController = require('../controllers/usuarioController');
const { validaLogin } = require('../middleware/validaLogin');


const usuarioRouter = Router();

usuarioRouter.get('/', userController.tdsUsrs);

usuarioRouter.get('/:id', userController.usrId);

usuarioRouter.post('/',validaLogin, userController.criaUsr);

usuarioRouter.put('/:id', userController.atlizUsuario);

usuarioRouter.patch('/:id', userController.atlzClassficacao);

usuarioRouter.delete('/:id', userController.delUsr);

module.exports = usuarioRouter;