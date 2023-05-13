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
      idColecao: id
    }
  });
  if (atualizada) {
    const colecao = await colecaoId(id);
    return { status: 200, resposta: colecao.resposta };
  }

  return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const criaColecao = async (obj) => {
  const { nomeColecao } = obj;
  const colecao = await db.Colecoes.findAll({ where: { nomeColecao } });
  if (colecao.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Coleção já cadastrado no banco de dados.'}};
  }
  const infoColecaoCriada = await db.Colecoes.create(obj);
  console.log('infoColecaocriado', infoColecaoCriada);
  return { status: 201, resposta: infoColecaoCriada };
};

const delColecao = async (id) => {
  const colecaoValida = await db.Colecoes.findByPk(id);
  if (!colecaoValida) {
    return { status: 404, resposta: { mensagem: 'Coleção não encontrado.' } };
  }
  await db.Colecoes.destroy({ where: { idColecao: id } });
  return { status: 200, resposta: { mensagem: 'Coleção deletada com sucesso.' } };
};

module.exports = {
  tdsColecoes,
  colecaoId,
  atlizColecao,
  criaColecao,
  delColecao,
};
