const { esquemaAutor } = require('../utilidades/esquemasValidacao');

const validaAutor = (req, res, next) => {
  const { body } = req;
  const validaEntrada = esquemaAutor.validate(body);
  if(validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  next();
};

module.exports = {
  validaAutor,
};
