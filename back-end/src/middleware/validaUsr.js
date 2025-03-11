const esquema = require('../utilidades/esquemasValidacao');

const validaUsrInfo = (req, res, next) => {
  const { body } = req;
  const validaEntrada = esquema.esquemaUsuario.validate(body);
  if(validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  next();
};

const validaClassificacao = (req, res, next) => {
  const { body } = req;
  const validaEntrada = esquema.esquemaClassificacao.validate(body);
  if(validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
  next();
}; 
module.exports = {
  validaUsrInfo,
  validaClassificacao,
};
