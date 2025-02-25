const listaTodosAutoresRetornoDB = [
  { dataValues: { id: 1, nome: 'J. R. R. Tolkien', nomeCompleto: 'John Ronald Reuel Tolkien' } },
  { dataValues: { id: 2, nome: 'Bernard Cornwell', nomeCompleto: 'Bernard Cornwell' } },
];

const listaTodosAutoresRetornoService = [
  { id: 1, nome: 'J. R. R. Tolkien', nomeCompleto: 'John Ronald Reuel Tolkien' },
  { id: 2, nome: 'Bernard Cornwell', nomeCompleto: 'Bernard Cornwell' },
];

const autorRetornoDb = {
  dataValues: { id: 1, nome: 'J. R. R. Tolkien', nomeCompleto: 'John Ronald Reuel Tolkien' }
};

const autorRetornoService = {
  id: 1, nome: 'J. R. R. Tolkien', nomeCompleto: 'John Ronald Reuel Tolkien'
};

const atualizaAutorRetornoService = {
  id: 1, nome: 'JRR Tolkien', nomeCompleto: 'John Ronald Reuel Tolkien'
};

const criaAutorRetornoDB = {
  dataValues: { id: 38, nome: 'Isaac Asimov', nomeCompleto: 'Isaac Asimov' }
};

module.exports = {
  listaTodosAutoresRetornoDB,
  listaTodosAutoresRetornoService,
  autorRetornoDb,
  autorRetornoService,
  atualizaAutorRetornoService,
  criaAutorRetornoDB
};
