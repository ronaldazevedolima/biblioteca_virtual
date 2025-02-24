const { esquemaLogin } = require('../utilidades/esquemasValidacao');

const validaLogin = (req, res, next) => {
  const { body } = req;
  const validaEntrada = esquemaLogin.validate(body);
  if(validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  next();
};

module.exports = {
  validaLogin,
};
