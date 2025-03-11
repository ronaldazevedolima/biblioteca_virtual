const { esquemaLivros, esquemaPutLivros, esquemaPatchLivrosLido } = require('../utilidades/esquemasValidacao');
const utils = require('../utilidades/utilidades');
const models = require('../models');

const validaLivros = (req, res, next) => {
  const validaEntrada = esquemaLivros.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
    
  return next();
};

const validaPutLivros = (req, res, next) => {
  const validaEntrada = esquemaPutLivros.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
    
  return next();
};

const validapatchLivrosLido = (req, res, next) => {
  const validaEntrada = esquemaPatchLivrosLido.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagem: validaEntrada.error.message });
  }
    
  return next();
};

const validaExistenciaCampos = async (req, res, next) => {
  const entradas = utils.criaEntradasVerificarId(req.body);
  const indexElementoNull = await utils.checaElementosPorId(models, entradas);
  if (indexElementoNull !== -1) {
    const campo = entradas[indexElementoNull][0];
    const tabela = utils.defineNomeModel(utils.formataEntradaModel(entradas[indexElementoNull][0]));
    return res.status(404)
      .json({ mensagem: `O campo ${campo} deve ser um valor existente na tabela ${tabela}.`});
  }
  return next();
};

module.exports = {
  validaLivros,
  validaPutLivros,
  validaExistenciaCampos,
  validapatchLivrosLido
};
