const { esquemaLivros } = require('../utilidades/esquemasValidacao');
const models = require('../models');

const validaLivros = (req, res, next) => {
  const validaEntrada = esquemaLivros.validate(req.body);
  if (validaEntrada.error) {
    return res.status(400).json({ mensagemErro: validaEntrada.error.details[0].message });
  }
    
  return next();
};

const defineNomeModel = (caso) => {
  switch (caso) {
  case 'idAutor':
    return 'Autores';
  case 'idCategoria':
    return 'Categorias';
  case 'idColecao':
    return 'Colecoes';
  default:
    return 'Editoras';
  }
};

const validaExistenciaCampos = async (req, res, next) => {
  const entradas = Object.entries(req.body).filter((e) => e[0].includes('id') && e[0].length > 4);

  let model;
  const promises = entradas.map((entrada) => {
    const nomeModel = entrada[0];
    const id = entrada[1];
    model = defineNomeModel(nomeModel);
    const buscaPorId = models[`${model}`].findByPk(id);
    return buscaPorId;
  });
  const resolvido = await Promise.all(promises);
  const buscaIndex = resolvido.findIndex((e) => e === null);

  if (buscaIndex !== -1) {
    const campo = entradas[buscaIndex][0];
    const tabela = defineNomeModel(entradas[buscaIndex][0]);
    return res.status(400)
      .json({ mesageErro: `O campo ${campo} deve ser um valor existente na tabela ${tabela}`});
  }
  return next();
};



module.exports = {
  validaLivros,
  validaExistenciaCampos,
};

// solução da função alidaExistenciaCampos usando for
// const {tenho, lido, nomeLivro, ...novoObj } = req.body;
// const chaves = Object.entries(novoObj);
// let model;
// for (let i = 0; i < chaves.length; i += 1) {
//   const campo = chaves[i][0];
//   const id = chaves[i][1];
//   model = case1(campo);
//   const buscaId = await models[`${model}`].findByPk(id);
//   if (buscaId === null) {
//     return res.status(400).json({ mesageErro: `O campo ${campo} deve ser um valor existente na tabela ${model}`});
//   } 
// }
// return next();