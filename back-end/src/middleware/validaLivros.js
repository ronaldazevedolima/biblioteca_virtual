const { esquemaLivros } = require('../utilidades/esquemasValidacao');
const { defineNomeModel, checaElementosPorId, formataEntradaModel, criaEntradasVerificarId } = require('../utilidades/utilidades');
const models = require('../models');

const validaLivros = (req, res, next) => {
  const validaEntrada = esquemaLivros.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagemErro: validaEntrada.error.details[0].message });
  }
    
  return next();
};

const validaExistenciaCampos = async (req, res, next) => {

  const entradas = criaEntradasVerificarId(req);

  // trocar nome da funcao checaElementosPorId
  const indexElementoNull = await checaElementosPorId(models, entradas);

  if (indexElementoNull !== -1) {
    const campo = entradas[indexElementoNull][0];
    const tabela = defineNomeModel(formataEntradaModel(entradas[indexElementoNull][0]));
    return res.status(400)
      .json({ mesageErro: `O campo ${campo} deve ser um valor existente na tabela ${tabela}`});
  }

  return next();
};

module.exports = {
  validaLivros,
  validaExistenciaCampos,
};
