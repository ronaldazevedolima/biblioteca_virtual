const { Op } = require('sequelize');
const { defineNomeModel, acessaPropriedade, formataLivrosRotasTenhoLido, criaArrayFlagIncludes } = require('../utilidades/utilidades');
const db = require('../models');

const arrCamposPossiveis = [
  'autor',
  'editora',
  'colecao',
  'categoria',
];

const valoFlagAttributes = ['id', 'nome', 'lido', 'tenho', 'nota'];

const procuraLivrosNaoLidosOuNaoTenho = async (coluna) => {
  
  const valorFlagIncludes = criaArrayFlagIncludes(db, arrCamposPossiveis);

  const listaLivros = await db.Livros.findAll({ where: { [coluna]: false }, attributes: valoFlagAttributes, include: valorFlagIncludes });

  const livrosFormatados = formataLivrosRotasTenhoLido(listaLivros);
 
  return { status: 200, resposta: livrosFormatados };
};


const tdsLivros = async () => {
  const listaLivros = await db.Livros.findAll();
  const filtroDados = listaLivros.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};

const procuraLivro = async (query) => {
  const entradas = Object.entries(query);
  const filtraCampoNome = entradas.filter((valor) => valor[0] !== 'nome');

  const valorFlagIncludes = arrCamposPossiveis.map((campoPossivel) => {
    const campoPassadoNaPesquisa = filtraCampoNome.find((campo) => campo[0] === campoPossivel);
    const where = campoPassadoNaPesquisa ? { nome: { [Op.like]: `%${campoPassadoNaPesquisa[1]}%` } } : {};  
    const operador = {
      model: db[defineNomeModel(campoPossivel)],
      as: campoPossivel,
      where,
      attributes: ['nome'],
    };
    return operador;
  });
  
  const valorFlagWhere = query.nome ? { nome: { [Op.like]: `%${query.nome}%` } } : {}; 

  const livros = await db.Livros.findAll({ where: valorFlagWhere, attributes: valoFlagAttributes, include: valorFlagIncludes });

  const livrosFormatados =  livros.map((e) => {
    const livroEditado = {
      ...e.dataValues,
      autor: acessaPropriedade(e, 'autor'),
      editora: acessaPropriedade(e, 'editora'),
      colecao: acessaPropriedade(e, 'colecao'),
      categoria: acessaPropriedade(e, 'categoria'),
    };    
    return livroEditado;
  });
  return { status: 200, resposta: livrosFormatados };
};

const procuraLivroPorId = async (id) => {
  const livro = await db.Livros.findByPk(id);
  if (!livro) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  return { status: 200, resposta: livro.dataValues };
};

const atlizLivro = async (id, obj) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  const [atualizado] = await db.Livros.update({ ...obj }, {
    where: {
      id
    }
  });
  if (atualizado) {
    return { status: 200, resposta: {...livroValido.dataValues, ...obj} };
  }

  return { status: 204 };
};

const criaLivro = async (obj) => {
  const { nome } = obj;
  const livro = await db.Livros.findAll({ where: { nome } });
  if (livro.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Livro já cadastrado no banco de dados.'}};
  }
  const infoLivroCriado = await db.Livros.create(obj);
  console.log('infoLivrocriado', infoLivroCriado);
  return { status: 201, resposta: infoLivroCriado };
};

const delLivro = async (id) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  try {
    await db.Livros.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Livro deletado com sucesso.' } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Livro não deletado.' } };
  }
};

const atlizLido = async (id, nota) => {
  const livro = await db.Livros.findByPk(id);
  if (!livro) {
    return { status: 404, resposta: { mensage: 'Livro não encontrado.' } };
  }

  const [atualizado] = await db.Livros.update({ lido: 1, nota }, { where : { id_livro: id } });

  if(!atualizado) {
    return { status: 200, resposta: { mensage: 'Nada para ser atualizado.' } };
  }

  const livroAtualizado = await db.Livros.findByPk(id);
  return { status: 200, resposta: livroAtualizado.dataValues };
};

module.exports = {
  tdsLivros,
  procuraLivroPorId,
  procuraLivro,
  atlizLivro,
  atlizLido,
  criaLivro,
  delLivro,
  procuraLivrosNaoLidosOuNaoTenho,
};
