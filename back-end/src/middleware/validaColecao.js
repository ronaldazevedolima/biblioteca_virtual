const { esquemaColecao } = require('../utilidades/esquemasValidacao');

const validaColecao = async (req, res, next) => {
  const validaEntrada = esquemaColecao.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  next();
};

module.exports = validaColecao;