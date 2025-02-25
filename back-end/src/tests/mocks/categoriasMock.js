const listaTodasCategoriasRetornoDB = [
  { dataValues: { id: 1, nome: 'Literatura fantástica' } },
  { dataValues: { id: 2, nome: 'Ficção histórica' } },
];
  
const listaTodasCategoriasRetornoService = [
  { id: 1, nome: 'Literatura fantástica' },
  { id: 2, nome: 'Ficção histórica' },
];
  
const categoriaRetornoDb = {
  dataValues: { id: 1, nome: 'Romance' }
};
  
const categoriaRetornoService = {
  id: 1, nome: 'Romance'
};
  
const atualizaCategoriaRetornoService = {
  id: 1, nome: 'Ficção Científica'
};
  
const criaCategoriaRetornoDB = {
  dataValues: { id: 4, nome: 'Romance' }
};
  
module.exports = {
  listaTodasCategoriasRetornoDB,
  listaTodasCategoriasRetornoService,
  categoriaRetornoDb,
  categoriaRetornoService,
  atualizaCategoriaRetornoService,
  criaCategoriaRetornoDB
};
  