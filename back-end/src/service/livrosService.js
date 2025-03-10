const { Op } = require('sequelize');
// const { defineNomeModel, acessaPropriedade, formataLivrosRotasTenhoLido, criaArrayFlagIncludes } = require('../utilidades/utilidades');
const util = require('../utilidades/utilidades');

const db = require('../models');

const arrCamposPossiveis = ['autor', 'editora', 'colecao', 'categoria'];

const valoFlagAttributes = ['id', 'nome', 'lido', 'tenho', 'nota'];

const tdsLivros = async () => {
  try {
    const listaLivros = await db.Livros.findAll();
    const filtroDados = listaLivros.map((el) => el.dataValues);
    return { status: 200, resposta: filtroDados };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todos os livros.' } };
  }
};

const procuraLivroPorId = async (id) => {
  try {
    const livro = await db.Livros.findByPk(id);
    if (!livro) {
      return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
    }
    return { status: 200, resposta: livro.dataValues };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por livro.' } };

  }
};

const atlizLivro = async (id, obj) => {
  try {
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
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar livro.' } };
  }
};

const criaLivro = async (obj) => {
  const { nome } = obj;
  try {
    const livro = await db.Livros.findAll({ where: { nome } });
    if (livro.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Livro já cadastrado no banco de dados.'}};
    }
    const infoLivroCriado = await db.Livros.create(obj);
    return { status: 201, resposta: infoLivroCriado.dataValues };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar livro.' } };
  }
};

const delLivro = async (id) => {
  try {
    const livroValido = await db.Livros.findByPk(id);
    if (!livroValido) {
      return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
    }
    await db.Livros.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Livro deletado com sucesso.' } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar livro.' } };
  }
};

const atlizLido = async (id, nota) => {
  try {
    const livro = await db.Livros.findByPk(id);
    if (!livro) {
      return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
    }

    const [atualizado] = await db.Livros.update({ lido: 1, nota }, { where : { id } });
  
    if(atualizado) {
      return { status: 200, resposta: {...livro.dataValues, lido: 1, nota } };
    }
    return { status: 204 };  
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar livro.' } };

  }
};

const procuraLivrosNaoLidosOuNaoTenho = async (coluna) => {
  try {
    const valorFlagIncludes = util.criaArrayFlagIncludes(db, arrCamposPossiveis);
    // console.log('valorflagincludes', valorFlagIncludes) 
    const listaLivros = await db.Livros.findAll({ where: { [coluna]: false }, attributes: valoFlagAttributes, include: valorFlagIncludes });
    const livrosFormatados = util.formataLivrosRotasTenhoLido(listaLivros);
    return { status: 200, resposta: livrosFormatados };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por livros.' } };

  }
};

const procuraLivro = async (query) => {
  try{  const entradas = Object.entries(query);
    const filtraCampoNome = entradas.filter((valor) => valor[0] !== 'nome');
    const valorFlagIncludes = arrCamposPossiveis.map((campoPossivel) => {
      const campoPassadoNaPesquisa = filtraCampoNome.find((campo) => campo[0] === campoPossivel);
      const where = campoPassadoNaPesquisa ? { nome: { [Op.like]: `%${campoPassadoNaPesquisa[1]}%` } } : {};  
      const operador = {
        model: db[util.defineNomeModel(campoPossivel)],
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
        autor: util.acessaPropriedade(e, 'autor'),
        editora: util.acessaPropriedade(e, 'editora'),
        colecao: util.acessaPropriedade(e, 'colecao'),
        categoria: util.acessaPropriedade(e, 'categoria'),
      };    
      return livroEditado;
    });
    return { status: 200, resposta: livrosFormatados };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por livros.' } };
  }
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
