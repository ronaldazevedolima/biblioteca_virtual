const db = require('../models');

const tdsEditoras = async () => {
  try {
    const listaEditoras = await db.Editoras.findAll();
    const filtroDados = listaEditoras.map((el) => el.dataValues);
    return { status: 200, resposta: filtroDados };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todas as editoras.' } };
  }
};

const editoraPorId = async (id) => {
  try {
    const editora = await db.Editoras.findByPk(id);
    if (!editora) {
      return { status: 404, resposta: { mensagem: 'Editora não encontrada.' } };
    }
    return { status: 200, resposta: editora.dataValues };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por editora.' } };
  }
};

const atlzEditora = async (id, obj) => {
  try {
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
      return { status: 200, resposta: { ...editoraValida.dataValues, ...obj } };
    }
  
    return { status: 204 };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar editora.' } };

  }
};

const criaEditora = async (obj) => {
  const { nome } = obj;
  try {
    const editoraValida = await db.Editoras.findAll({ where: { nome } });
    if (editoraValida.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Editora já cadastrada no banco de dados.' } };
    }
    const novaEditora = await db.Editoras.create(obj);
    return { status: 201, resposta: novaEditora.dataValues };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar editora.' } };
  }
};


const delEditora = async (id) => {
  try {
    const editoraValida = await db.Editoras.findByPk(id);
    if (!editoraValida) {
      return { status: 404, resposta: { mensagem: 'Editora não encontrada.' } };
    }
    await db.Editoras.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Editora deletada com sucesso.' } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar editora.' } };
  }
};
    
module.exports = {
  tdsEditoras,
  editoraPorId,
  criaEditora,
  atlzEditora,
  delEditora,
};
