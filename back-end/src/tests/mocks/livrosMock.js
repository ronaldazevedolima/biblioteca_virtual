const listaTodosLivrosRetornoDB = [
  { dataValues:
    {
      'id': 1,
      'idColecao': 2,
      'nome': 'A Sociedade do Anel',
      'idAutor': 1,
      'tenho': true,
      'lido': true,
      'nota': 10,
      'idCategoria': 1,
      'idEditora': 1
    }
  },
  { dataValues:
    {
      'id': 2,
      'idColecao': 2,
      'nome': 'As Duas Torres',
      'idAutor': 1,
      'tenho': true,
      'lido': true,
      'nota': 10,
      'idCategoria': 1,
      'idEditora': 1
    }
  },
];
        
const listaTodosLivrosRetornoService =[
  {
    'id': 1,
    'idColecao': 2,
    'nome': 'A Sociedade do Anel',
    'idAutor': 1,
    'tenho': true,
    'lido': true,
    'nota': 10,
    'idCategoria': 1,
    'idEditora': 1
  },
  {
    'id': 2,
    'idColecao': 2,
    'nome': 'As Duas Torres',
    'idAutor': 1,
    'tenho': true,
    'lido': true,
    'nota': 10,
    'idCategoria': 1,
    'idEditora': 1
  },
];
        
const livrosRetornoDb = {
  dataValues: {
    'id': 1,
    'idColecao': 2,
    'nome': 'A Sociedade do Anel',
    'idAutor': 1,
    'tenho': true,
    'lido': true,
    'nota': 10,
    'idCategoria': 1,
    'idEditora': 1
  }
};

const livroLidoRetornoDb = {
  dataValues: {
    'id': 1,
    'idColecao': 2,
    'nome': 'A Sociedade do Anel',
    'idAutor': 1,
    'tenho': 1,
    'lido': 0,
    'nota': 0,
    'idCategoria': 1,
    'idEditora': 1
  }
};
        
const livrosRetornoService = {
  'id': 1,
  'idColecao': 2,
  'nome': 'A Sociedade do Anel',
  'idAutor': 1,
  'tenho': true,
  'lido': true,
  'nota': 10,
  'idCategoria': 1,
  'idEditora': 1
};
        
const atualizaLivrosRetornoService = {
  'id': 1,
  'idColecao': 2,
  'nome': 'Sociedade do Anel',
  'idAutor': 1,
  'tenho': true,
  'lido': true,
  'nota': 10,
  'idCategoria': 1,
  'idEditora': 1
};

const atualizaLidoRetornoService = {
  'id': 1,
  'idColecao': 2,
  'nome': 'A Sociedade do Anel',
  'idAutor': 1,
  'tenho': 1,
  'lido': 1,
  'nota': 10,
  'idCategoria': 1,
  'idEditora': 1
};

const criaLivrosRetornoDB = {
  dataValues: {
    'id': 176,
    'nome': 'Um livro muito legal',
    'idColecao': 1,
    'idAutor': 1,
    'tenho': true,
    'lido': true,
    'idCategoria': 1,
    'idEditora': 1
  }
};


const retornolivrosLidoTenhoDb = [
  {
    dataValues: {
      id: 60,
      nome: 'União',
      tenho: false,
      autor: {
        dataValues: {
          nome: 'Oliver Bowden'
        }
      },
      colecao: {
        dataValues: {
          nome: 'Assassin`s Creed'
        }
      }
    },
  },
  {
    dataValues: {
      id: 62,
      nome: 'Juramento do Deserto',
      tenho: false,
      autor: {
        dataValues: {
          nome: 'Oliver Bowden'
        }
      },
      colecao: {
        dataValues: {
          nome: 'Assassin`s Creed'
        }
      }
    },
  },
];

const retornolivrosLidoTenhoService = [
  {
    id: 60,
    nome: 'União',
    tenho: false,
    autor: 'Oliver Bowden',
    colecao: 'Assassin`s Creed'
  },
  {
    id: 62,
    nome: 'Juramento do Deserto',
    tenho: false,
    autor: 'Oliver Bowden',
    colecao: 'Assassin`s Creed'
  }
];

const listaProcuraLivroDB = [
  {
    dataValues: {
      id: 1,
      nome: 'A Sociedade do Anel',
      lido: true,
      tenho: true,
      nota: 10
    },
    autor: {
      dataValues: {
        nome: 'J. R. R. Tolkien'
      }
    },
    editora: {
      dataValues: {
        nome: 'Martins Fontes'
      }
    },
    colecao: {
      dataValues: {
        nome: 'O Senhor dos Anéis'
      }
    },
    categoria: {
      dataValues: {
        nome: 'Literatura fantástica'
      }
    },
  },
  {
    dataValues: {
      id: 2,
      nome: 'As Duas Torres',
      lido: true,
      tenho: true,
      nota: 10
    },
    autor: {
      dataValues: {
        nome: 'J. R. R. Tolkien'
      }
    },
    editora: {
      dataValues: {
        nome: 'Martins Fontes'
      }
    },
    colecao: {
      dataValues: {
        nome: 'O Senhor dos Anéis'
      }
    },
    categoria: {
      dataValues: {
        nome: 'Literatura fantástica'
      }
    },
  }
];

const listaProcuraLivroService = [
  {
    'id': 1,
    'nome': 'A Sociedade do Anel',
    'lido': true,
    'tenho': true,
    'nota': 10,
    'autor': 'J. R. R. Tolkien',
    'editora': 'Martins Fontes',
    'colecao': 'O Senhor dos Anéis',
    'categoria': 'Literatura fantástica'
  },
  {
    'id': 2,
    'nome': 'As Duas Torres',
    'lido': true,
    'tenho': true,
    'nota': 10,
    'autor': 'J. R. R. Tolkien',
    'editora': 'Martins Fontes',
    'colecao': 'O Senhor dos Anéis',
    'categoria': 'Literatura fantástica'
  }
];


module.exports = {
  listaTodosLivrosRetornoDB,
  listaTodosLivrosRetornoService,
  livrosRetornoDb,
  livrosRetornoService,
  atualizaLivrosRetornoService,
  criaLivrosRetornoDB,
  atualizaLidoRetornoService,
  livroLidoRetornoDb,
  retornolivrosLidoTenhoDb,
  retornolivrosLidoTenhoService,
  listaProcuraLivroDB,
  listaProcuraLivroService
};
        