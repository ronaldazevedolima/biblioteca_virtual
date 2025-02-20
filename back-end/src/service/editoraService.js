const db = require('../models');

const tdsEditoras = async () => {
  const editoras = await db.Editoras.findAll();
  return { status: 200, resposta: editoras };
};

const editoraPorId = async (id) => {
  const editora = await db.Editoras.findByPk(id);
  if (!editora) {
    return { status: 404, resposta: { mensagem: 'Editora não encontrada.' } };
  }
  return { status: 200, resposta: editora };
};

const criaEditora = async (obj) => {
  const { nome } = obj;
  const editoraValida = await db.Editoras.findAll({ where: { nome } });
  if (editoraValida.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Editora já cadastradano banco de dados.' } };
  }
  const novaEditora = await db.Editoras.create(obj);
  return { status: 201, resposta: novaEditora };
};

const atlzEditora = async (id, obj) => {
  const editoraValida = await db.Editoras.findByPk(id);
  if (!editoraValida) {
    return { status: 404, resposta: { mensagem: 'Editora não encontrada.' } };
  }

  const [atualizada] = await db.Editoras.update({ ...obj }, {
    where: {
      id
    }
  });

  if (atualizada) {
    const editora = await editoraPorId(id);
    return { status: 200, resposta: editora.resposta };
  }

  return { status: 204 };
};

const delEditora = async (id) => {
  const editoraValida = await db.Editoras.findByPk(id);
  if (!editoraValida) {
    return { status: 404, resposta: { mensagem: 'Editora não encontrada.' } };
  }
  try {
    await db.Editoras.destroy({ where: { id } });
    return { status: 204, resposta: { mensagem: 'Editora deletada com sucesso.' } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Editora não deletada.' } };
  }
};
    
module.exports = {
  tdsEditoras,
  editoraPorId,
  criaEditora,
  atlzEditora,
  delEditora,
};
