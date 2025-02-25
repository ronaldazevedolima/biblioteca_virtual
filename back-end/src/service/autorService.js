const db = require('../models');

const tdsAutores = async () => {
  try {
    const listaAutores = await db.Autores.findAll();
    const filtroDados = listaAutores.map((el) => el.dataValues);
    return { status: 200, resposta: filtroDados };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todos os autores.' } };
  }
};

const autorId = async (id) => {
  try {
    const autor = await db.Autores.findByPk(id);
    if (!autor) {
      return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
    }
    return { status: 200, resposta: autor.dataValues };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por autor.' } };
  }
};

const atlizAutor = async (id, obj) => {
  try {
    const autorValido = await db.Autores.findByPk(id);
    if (!autorValido) {
      return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
    }
    const [atualizado] = await db.Autores.update({ ...obj }, {
      where: {
        id
      }
    });
    if (atualizado) {
      return { status: 200, resposta: {...autorValido.dataValues, ...obj} };
    }
  
    return { status: 204 };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar autor.' } };
  }
};

const criaAutor = async (obj) => {
  const { nomeCompleto } = obj;
  try {
    const autor = await db.Autores.findAll({ where: { nomeCompleto } });
    if (autor.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Autor já cadastrado no banco de dados.'}};
    }
    const infoAutorCriado = await db.Autores.create(obj);
    return { status: 201, resposta: infoAutorCriado.dataValues };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar autor.' } };
  }
};

const delAutor = async (id) => {
  try {
    const autorValido = await db.Autores.findByPk(id);
    if (!autorValido) {
      return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
    }
    await db.Autores.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Autor deletado com sucesso.' } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar autor.' } };
  }
};

module.exports = {
  tdsAutores,
  autorId,
  atlizAutor,
  criaAutor,
  delAutor,
};
