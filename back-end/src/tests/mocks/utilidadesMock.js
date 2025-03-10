const { Colecoes, Autores, Categorias, Editoras } = require('../../models');

const criaEntradasMock = {
  'nome': '355d5',
  'idColecao': 1,
  'idAutor': 1,
  'tenho': 1,
  'lido': 0,
  'nota': 0,
  'idCategoria': 1,
  'idEditora': 1
};

const retornoCriaEntradas = [
  [ 'idColecao', 1 ],
  [ 'idAutor', 1 ],
  [ 'idCategoria', 1 ],
  [ 'idEditora', 1 ]
];

const retornoCriaFlagIncludes = [
  { model: Autores, as: 'autor', where: {}, attributes: [ 'nome' ] },
  { model: Editoras, as: 'editora', where: {}, attributes: [ 'nome' ] },
  { model: Colecoes, as: 'colecao', where: {}, attributes: [ 'nome' ] },
  {
    model: Categorias,
    as: 'categoria',
    where: {},
    attributes: [ 'nome' ]
  }
];

module.exports = {
  criaEntradasMock,
  retornoCriaEntradas,
  retornoCriaFlagIncludes
};