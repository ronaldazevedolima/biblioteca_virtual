const { Router } = require('express');

const userController = require('../controllers/usuarioController');
const { validaUsrInfo, validaClassificacao } = require('../middleware/validaUsr');


const usuarioRouter = Router();

usuarioRouter.get('/', userController.tdsUsrs);

usuarioRouter.get('/:id', userController.usrId);

usuarioRouter.post('/',validaUsrInfo , userController.criaUsr);

usuarioRouter.put('/:id',validaUsrInfo, userController.atlizUsuario);

usuarioRouter.patch('/:id',validaClassificacao, userController.atlzClassficacao);

usuarioRouter.delete('/:id', userController.delUsr);

module.exports = usuarioRouter;