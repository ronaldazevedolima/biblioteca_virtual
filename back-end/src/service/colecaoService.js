const db = require('../models');

const tdsColecoes = async () => {
  try {
    const listaColecoes = await db.Colecoes.findAll();
    const filtroDados = listaColecoes.map((el) => el.dataValues);
    return { status: 200, resposta: filtroDados };
  }
  catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todas as coleções.' } };
  }
};
    

const colecaoId = async (id) => {
  try {
    const colecao = await db.Colecoes.findByPk(id);
    if (!colecao) {
      return { status: 404, resposta: { mensagem: 'Coleção não encontrada.' } };
    }
    return { status: 200, resposta: colecao.dataValues };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por coleção.' } };

  }
};

const atlizColecao = async (id, obj) => {
  try {
    const colecaoValida = await db.Colecoes.findByPk(id);
    if (!colecaoValida) {
      return { status: 404, resposta: { mensagem: 'Coleção não encontrada.' } };
    }
    const [atualizada] = await db.Colecoes.update({ ...obj }, {
      where: {
        id: id
      }
    });
    if (atualizada) {
      return { status: 200, resposta: {...colecaoValida.dataValues, ...obj} };
    }
  
    return { status: 204 };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar coleção.' } };

  }
};

const criaColecao = async (obj) => {
  const { nome } = obj;
  try {
    const colecao = await db.Colecoes.findAll({ where: { nome } });
    if (colecao.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Coleção já cadastrada no banco de dados.'}};
    }
    const infoColecaoCriada = await db.Colecoes.create(obj);
    return { status: 201, resposta: infoColecaoCriada.dataValues };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar coleção.' } };

  }
};

const delColecao = async (id) => {
  try {
    const colecaoValida = await db.Colecoes.findByPk(id);
    if (!colecaoValida) {
      return { status: 404, resposta: { mensagem: 'Coleção não encontrada.' } };
    }
    await db.Colecoes.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Coleção deletada com sucesso.' } };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar coleção.' } };
  }
};

module.exports = {
  tdsColecoes,
  colecaoId,
  atlizColecao,
  criaColecao,
  delColecao,
};
