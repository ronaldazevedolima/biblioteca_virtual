const db = require('../models');

const tdsLivros = async () => {
  console.log('SERVICEEE');
  const listaLivros = await db.Livros.findAll();
  const filtroDados = listaLivros.map((el) => el.dataValues);
  return { status: 200, resposta: filtroDados };
};

const livroPorId = async (id) => {
  const livro = await db.Livros.findByPk(id);
  if (!livro) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  return { status: 200, resposta: livro.dataValues };
};

const atlizLivro = async (id, obj) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  const [atualizado] = await db.Livros.update({ ...obj }, {
    where: {
      idLivro: id
    }
  });
  if (atualizado) {
    const livro = await livroPorId(id);
    return { status: 200, resposta: livro.resposta };
  }

  return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const criaLivro = async (obj) => {
  const { nomeLivro } = obj;
  const livro = await db.Livros.findAll({ where: { nomeLivro } });
  if (livro.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Livro já cadastrado no banco de dados.'}};
  }
  const infoLivroCriado = await db.Livros.create(obj);
  console.log('infoLivrocriado', infoLivroCriado);
  return { status: 201, resposta: infoLivroCriado };
};

const delLivro = async (id) => {
  const livroValido = await db.Livros.findByPk(id);
  if (!livroValido) {
    return { status: 404, resposta: { mensagem: 'Livro não encontrado.' } };
  }
  await db.Livros.destroy({ where: { idLivro: id } });
  return { status: 200, resposta: { mensagem: 'Livro deletado com sucesso.' } };
};

module.exports = {
  tdsLivros,
  livroPorId,
  atlizLivro,
  criaLivro,
  delLivro,
};