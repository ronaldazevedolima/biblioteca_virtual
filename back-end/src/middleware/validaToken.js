const { verificarToken } = require('../utilidades/tokenUtils');

const validaToken = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ mensagem: 'Token de autenticação não fornecido.' });
  }

  const token = authorization.split(' ')[1];

  const tokenValido = await verificarToken(token);

  if(!tokenValido) {
    return res.status(401).json({ mensagem: 'Token fornecido é inválido.' });
  }
  
  req.user = tokenValido;
  
  return next();
};

const validaAdmin = (req, res, next) => {
  const { classificacao } = req.user;
  
  if (classificacao !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado, área restrita para adiministradores.' });
  }

  return next();
};

const validaAcesso = (req, res, next) => {
  const { id: idUser, classificacao } = req.user;
  const { id: idRota } = req.params;

  if (idUser !== +idRota && classificacao !== 'admin') {
    return res.status(403).json({ mensagem: 'Acesso negado.' });
  }
  return next();
};

module.exports = {
  validaToken,
  validaAdmin,
  validaAcesso
};
