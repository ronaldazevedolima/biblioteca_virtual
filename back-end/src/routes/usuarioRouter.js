const { Router } = require('express');

const userController = require('../controllers/usuarioController');
const { validaUsrInfo, validaClassificacao } = require('../middleware/validaUsr');
const { validaId } = require('../middleware/validaId');
const { validaLogin } = require('../middleware/validaLogin');
const { validaToken, validaAdmin, validaAcesso } = require('../middleware/validaToken');


const usuarioRouter = Router();

usuarioRouter.post('/',validaUsrInfo , userController.criaUsr);

// rota de login
usuarioRouter.post('/login',validaLogin, userController.efetuarLogin);

usuarioRouter.use(validaToken);

usuarioRouter.get('/', userController.tdsUsrs);

usuarioRouter.use('/:id',validaId);

usuarioRouter.get('/:id', userController.usrId);

// validação de acesso de admim ou prorpio id
usuarioRouter.put('/:id',validaAcesso, validaUsrInfo, userController.atlizUsuario);

// validação de acesso só admim
usuarioRouter.patch('/:id', validaAdmin, validaClassificacao, userController.atlzClassficacao);

usuarioRouter.delete('/:id',validaAcesso, userController.delUsr);

module.exports = usuarioRouter;
