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


module.exports = {
  checaElementosPorId,
  criaEntradasVerificarId,
  formataEntradaModel,
  defineNomeModel,
};