const { Router } = require('express');

const userController = require('../controllers/usuarioController');
const { validaUsrInfo, validaClassificacao } = require('../middleware/validaUsr');
const { validaId } = require('../middleware/validaId');


const usuarioRouter = Router();

usuarioRouter.get('/', userController.tdsUsrs);

usuarioRouter.post('/',validaUsrInfo , userController.criaUsr);

usuarioRouter.use(validaId);

usuarioRouter.get('/:id', userController.usrId);

usuarioRouter.put('/:id',validaUsrInfo, userController.atlizUsuario);

usuarioRouter.patch('/:id',validaClassificacao, userController.atlzClassficacao);

usuarioRouter.delete('/:id', userController.delUsr);

module.exports = usuarioRouter;
