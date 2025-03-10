const listaTodosUsuariosDB = [
  {
    dataValues: {
      id: 1,
      nome: 'Ronald Lima',
      email: 'ronald@ronald.com',
      classificacao: 'admin'
    }
  },
  {
    dataValues: {
      id: 2,
      nome: 'Lorena',
      email: 'lorena@lorena.com',
      classificacao: 'cliente'
    }
  }
];


const listaTodosUsuariosService = [
  {
    id: 1,
    nome: 'Ronald Lima',
    email: 'ronald@ronald.com',
    classificacao: 'admin'
  },
  {

    id: 2,
    nome: 'Lorena',
    email: 'lorena@lorena.com',
    classificacao: 'cliente'
  }
];

const usuarioPorIdDb = {
  dataValues: {
    id: 1,
    nome: 'Ronald Lima',
    email: 'ronald@ronald.com',
    classificacao: 'admin'
  },
  get: () => usuarioPorIdDb.dataValues
};

const retornoAtualizaUserService = {
  id: 1,
  nome: 'Ronald',
  email: 'ronald@ronald.com',
  classificacao: 'admin'
};

const usuarioCriadoDb = {
  dataValues: {
    id: 1,
    nome: 'Aryadne',
    email: 'aryadne@aryadne.com',
    classificacao: 'cliente'
  }
};

const retornologinDB = {
  dataValues: {
    id: 1,
    nome: 'Ronald Lima',
    email: 'ronald@ronald.com',
    senha: 'fakeSenha',
    classificacao: 'admin'
  }
};

module.exports = {
  listaTodosUsuariosDB,
  usuarioPorIdDb,
  listaTodosUsuariosService,
  retornoAtualizaUserService,
  usuarioCriadoDb,
  retornologinDB
};