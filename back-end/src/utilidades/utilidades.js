const objNomeModel = {
  'autor': 'Autores',
  'categoria': 'Categorias',
  'colecao': 'Colecoes',
  'editora': 'Editoras',
};

// refatorar para ter um metodo só e mudar o nome do as no model de livros
const defineNomeModel = (caso) => objNomeModel[caso];

const formataEntradaModel = (nome) => nome.replace('id', '').toLowerCase();

const checaElementosPorId = async (models, entradas) => {
  let model;
  const arrayPromessasBusacandoCampoPorId = entradas.map((entrada) => {
    const nomeModel = formataEntradaModel(entrada[0]);
    const id = entrada[1];
    model = defineNomeModel(nomeModel);
    const buscaPorId = models[model].findByPk(id);
    return buscaPorId;
  });
  const resolvePromessas = await Promise.all(arrayPromessasBusacandoCampoPorId);
  const buscaIndexElementoNull = resolvePromessas.findIndex((e) => e === null);
  return buscaIndexElementoNull;
};

const criaEntradasVerificarId = (req) => Object.entries(req.body).filter((e) => e[0].includes('id') && !e[0].includes('lido'));

const acessaPropriedade = (e, string) => {
  return e.dataValues[string].dataValues.nome;
};

const formataLivrosRotasTenhoLido = (listaLivros) => {
  const resultado = listaLivros.map((e) => {
    const {nome, tenho} = e.dataValues;
    const livroEditado = {
      nome,
      tenho,
      autor: acessaPropriedade(e, 'autor'),
      colecao: acessaPropriedade(e, 'colecao'),
    };    
    return livroEditado;
  });
  return resultado;
};

const criaArrayFlagIncludes = (db, array) => {
  const resultado = array.map((campoPossivel) => {
    const operador = {
      model: db[defineNomeModel(campoPossivel)],
      as: campoPossivel,
      where: {},
      attributes: ['nome'],
    };
    return operador;
  });
  return resultado;
};

module.exports = {
  criaArrayFlagIncludes,
  acessaPropriedade,
  formataLivrosRotasTenhoLido,
  checaElementosPorId,
  criaEntradasVerificarId,
  formataEntradaModel,
  defineNomeModel,
};