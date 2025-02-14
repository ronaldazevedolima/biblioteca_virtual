const db = require('../models');

const tdsCategorias = async () => {
  const listaCategorias = await db.Categorias.findAll();
  const filtroDados = listaCategorias.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};


const categoriaId = async (id) => {
  const categoria = await db.Categorias.findByPk(id);
  if (!categoria) {
    return { status: 404, resposta: { mensagem: 'Categoria não encontrada.' } };
  }
  return { status: 200, resposta: categoria.dataValues };
};

const atlizCategoria = async (id, obj) => {
  const categoriaValida = await db.Categorias.findByPk(id);
  if (!categoriaValida) {
    return { status: 404, resposta: { mensagem: 'Categoria não encontrada.' } };
  }
  const [atualizada] = await db.Categorias.update({ ...obj }, {
    where: {
      id
    }
  });
  if (atualizada) {
    const categoria = await categoriaId(id);
    return { status: 200, resposta: categoria.resposta };
  }

  return { status: 204};
};

const criaCategoria = async (obj) => {
  const { nome } = obj;
  const categoria = await db.Categorias.findAll({ where: { nome } });
  if (categoria.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Categoria já cadastrado no banco de dados.'}};
  }
  const infoCategoriaCriada = await db.Categorias.create(obj);
  return { status: 201, resposta: infoCategoriaCriada.dataValues };
};

const delCategoria = async (id) => {
  const categoriaValida = await db.Categorias.findByPk(id);
  if (!categoriaValida) {
    return { status: 404, resposta: { mensagem: 'Categoria não encontrada.' } };
  }
  try {
    await db.Categorias.destroy({ where: { idCategoria: id } });
    return { status: 200, resposta: { mensagem: 'Categoria deletada com sucesso.' } };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Categoria não deletada.' } };
  }
};

module.exports = {
  tdsCategorias,
  categoriaId,
  atlizCategoria,
  criaCategoria,
  delCategoria,
};
