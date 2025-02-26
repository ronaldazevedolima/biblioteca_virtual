const listaTodasColecoesRetornoDB = [
  { dataValues: { id: 1, nome: 'Sem Coleção', volumes: 1 } },
  { dataValues: { id: 2, nome: 'O Senhor dos Anéis', volumes: 3 } },
];
    
const listaTodasColecoesRetornoService = [
  { id: 1, nome: 'Sem Coleção', volumes: 1 },
  { id: 2, nome: 'O Senhor dos Anéis', volumes: 3 },
];
    
const colecoesRetornoDb = {
  dataValues: { id: 1, nome: 'Sem Coleção', volumes: 1 }
};
    
const colecoesRetornoService = { id: 1, nome: 'Sem Coleção', volumes: 1 };
    
const atualizaColecoesRetornoService = {
  id: 1, nome: 'Sem Coleção', volumes: 2
};
    
const criaColecoesRetornoDB = {
  dataValues: { id: 39, nome: 'Os contos da carochinha', volumes: 3 }
};
    
module.exports = {
  listaTodasColecoesRetornoDB,
  listaTodasColecoesRetornoService,
  colecoesRetornoDb,
  colecoesRetornoService,
  atualizaColecoesRetornoService,
  criaColecoesRetornoDB
};
    