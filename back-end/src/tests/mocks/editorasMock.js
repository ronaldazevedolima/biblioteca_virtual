const listaTodasEditorasRetornoDB = [
  { dataValues: { id: 1, nome: 'Martins Fontes' } },
  { dataValues: { id: 2, nome: 'Leya' } },
];
      
const listaTodasEditorasRetornoService = [
  { id: 1, nome: 'Martins Fontes' },
  { id: 2, nome: 'Leya' },
];
      
const editorasRetornoDb = {
  dataValues: { id: 1, nome: 'Martins Fontes' }
};
      
const editorasRetornoService = { id: 1, nome: 'Martins Fontes' };
      
const atualizaEditorasRetornoService = {
  id: 1, nome: 'Martin Fontes'
};
      
const criaEditorasRetornoDB = {
  dataValues: { id: 20, nome: 'Nova editora' }
};
      
module.exports = {
  listaTodasEditorasRetornoDB,
  listaTodasEditorasRetornoService,
  editorasRetornoDb,
  editorasRetornoService,
  atualizaEditorasRetornoService,
  criaEditorasRetornoDB
};
      