const db = require('../models');

const tdsEditoras = async () => {
  const editoras = await db.Editora.findAll();
  return { status: 200, resposta: editoras };
};

const editoraPorId = async (id) => {
  const editora = await db.Editora.findByPk(id);
  if (!editora) {
    return { status: 404, resposta: { erro: 'Editora não encontrada' } };
  }
  return { status: 200, resposta: editora };
};

const criaEditora = async (obj) => {
  const { nomeEditora } = obj;
  const editoraValida = await db.Editora.findAll({ where: { nomeEditora } });
  if (editoraValida.length !== 0) {
    return { status: 400, resposta: { erro: 'Editora já cadastrada' } };
  }
  const novaEditora = await db.Editora.create(obj);
  return { status: 201, resposta: novaEditora };
};

const atlzEditora = async (id, obj) => {
  const editoraValida = await db.Editora.findByPk(id);
  if (!editoraValida) {
    return { status: 404, resposta: { erro: 'Editora não encontrada' } };
  }

  const [atualizada] = await db.Editora.update({ ...obj }, {
    where: {
      idEditora: id
    }
  });

  if (atualizada) {
    const editora = await editoraPorId(id);
    return { status: 200, resposta: editora.resposta };
  }

  return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const delEditora = async (id) => {
  const editoraValida = await db.Editora.findByPk(id);
  if (!editoraValida) {
    return { status: 404, resposta: { erro: 'Editora não encontrada' } };
  }
  await db.Editora.destroy({ where: { idEditora: id } });
  return { status: 200, resposta: { mensagem: 'Editora deletada com sucesso.' } };
};
    
module.exports = {
  tdsEditoras,
  editoraPorId,
  criaEditora,
  atlzEditora,
  delEditora,
};
