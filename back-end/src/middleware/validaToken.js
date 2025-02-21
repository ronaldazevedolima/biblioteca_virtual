const { verificarToken } = require('../utilidades/tokenUtils');

const validaToken = async (req, res, next) => {
  const { authorization } = req.headres;

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
    return res.status(403).json({ mensagem: 'Acesso negado, area restrita para adiministradores.' });
  }

  return next();
};

module.exports = {
  validaToken,
  validaAdmin
};
