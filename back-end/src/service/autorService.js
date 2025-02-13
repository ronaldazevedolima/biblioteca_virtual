const db = require('../models');

const tdsAutores = async () => {
  const listaAutores = await db.Autores.findAll();
  const filtroDados = listaAutores.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};

const autorId = async (id) => {
  const autor = await db.Autores.findByPk(id);
  if (!autor) {
    return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
  }
  return { status: 200, resposta: autor.dataValues };
};

const atlizAutor = async (id, obj) => {
  const autorValido = await db.Autores.findByPk(id);
  if (!autorValido) {
    return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
  }
  const [atualizado] = await db.Autores.update({ ...obj }, {
    where: {
      idAutor: id
    }
  });
  if (atualizado) {
    const autor = await autorId(id);
    return { status: 200, resposta: autor.resposta };
  }

  return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const criaAutor = async (obj) => {
  const { nomeCompleto } = obj;
  const autor = await db.Autores.findAll({ where: { nomeCompleto } });
  if (autor.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Autor já cadastrado no banco de dados.'}};
  }
  const infoAutorCriado = await db.Autores.create(obj);
  return { status: 201, resposta: infoAutorCriado };
};

const delAutor = async (id) => {
  const autorValido = await db.Autores.findByPk(id);
  if (!autorValido) {
    return { status: 404, resposta: { mensagem: 'Autor não encontrado.' } };
  }
  await db.Autores.destroy({ where: { idAutor: id } });
  return { status: 200, resposta: { mensagem: 'Autor deletado com sucesso.' } };
};

module.exports = {
  tdsAutores,
  autorId,
  atlizAutor,
  criaAutor,
  delAutor,
};
