const db = require('../models');

const tdsCategorias = async () => {
  try {
    const listaCategorias = await db.Categorias.findAll();
    const filtroDados = listaCategorias.map((el) => el.dataValues);
    return { status: 200, resposta: filtroDados };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todas as categorias.' } };
  }
};


const categoriaId = async (id) => {
  try {
    const categoria = await db.Categorias.findByPk(id);
    if (!categoria) {
      return { status: 404, resposta: { mensagem: 'Categoria não encontrada.' } };
    }
    return { status: 200, resposta: categoria.dataValues };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por categoria.' } };

  }
};

const atlizCategoria = async (id, obj) => {
  try {
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
      return { status: 200, resposta: { ...categoriaValida.dataValues, ...obj } };
    }
  
    return { status: 204};

  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar categoria.' } };

  }
};

const criaCategoria = async (obj) => {
  const { nome } = obj;
  try {
    const categoria = await db.Categorias.findAll({ where: { nome } });
    if (categoria.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Categoria já cadastrada no banco de dados.'}};
    }
    const infoCategoriaCriada = await db.Categorias.create(obj);
    return { status: 201, resposta: infoCategoriaCriada.dataValues };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar categoria.' } };

  }
};

const delCategoria = async (id) => {
  try {
    const categoriaValida = await db.Categorias.findByPk(id);
    if (!categoriaValida) {
      return { status: 404, resposta: { mensagem: 'Categoria não encontrada.' } };
    }
    await db.Categorias.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Categoria deletada com sucesso.' } };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar categoria.' } };
  }
};

module.exports = {
  tdsCategorias,
  categoriaId,
  atlizCategoria,
  criaCategoria,
  delCategoria,
};
