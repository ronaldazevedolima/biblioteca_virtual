const { esquemaEditora } = require('../utilidades/esquemasValidacao');

const validaEditora = (req, res, next) => {
  const validaEntrada = esquemaEditora.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  return next();
};

module.exports = validaEditora;