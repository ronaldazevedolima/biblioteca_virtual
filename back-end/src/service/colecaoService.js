const db = require('../models');

const tdsColecoes = async () => {
  const listaColecoes = await db.Colecoes.findAll();
  const filtroDados = listaColecoes.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};

const colecaoId = async (id) => {
  const colecao = await db.Colecoes.findByPk(id);
  if (!colecao) {
    return { status: 404, resposta: { mensagem: 'Coleção não encontrada.' } };
  }
  return { status: 200, resposta: colecao.dataValues };
};

const atlizColecao = async (id, obj) => {
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
    const colecao = await colecaoId(id);
    return { status: 200, resposta: colecao.resposta };
  }

  return { status: 204 };
};

const criaColecao = async (obj) => {
  const { nome } = obj;
  const colecao = await db.Colecoes.findAll({ where: { nome } });
  if (colecao.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Coleção já cadastrado no banco de dados.'}};
  }
  const infoColecaoCriada = await db.Colecoes.create(obj);
  return { status: 201, resposta: infoColecaoCriada.dataValues };
};

const delColecao = async (id) => {
  const colecaoValida = await db.Colecoes.findByPk(id);
  if (!colecaoValida) {
    return { status: 404, resposta: { mensagem: 'Coleção não encontrado.' } };
  }
  try {
    await db.Colecoes.destroy({ where: { idColecao: id } });
    return { status: 200, resposta: { mensagem: 'Coleção deletada com sucesso.' } };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Coleção não deletada.' } };
  }
};

module.exports = {
  tdsColecoes,
  colecaoId,
  atlizColecao,
  criaColecao,
  delColecao,
};
