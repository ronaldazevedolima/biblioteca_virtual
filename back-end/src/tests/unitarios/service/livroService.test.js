const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { Livros } = require('../../../models');
const {
  tdsLivros,
  procuraLivroPorId,
  atlizLivro,
  criaLivro,
  delLivro,
  atlizLido,
  procuraLivro,
  procuraLivrosNaoLidosOuNaoTenho
} = require('../../../service/livrosService');

const utilidades = require('../../../utilidades/utilidades');

const {
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
} = require('../../mocks/livrosMock');

chai.use(sinonChai);
const { expect } = chai;



const array = [
  { nome: '' },
  { autor: '' },
  { editora: '' },
  { colecao: '' },
  { nome: '', autor: '' },
  { nome: '', editora: '' },
  { nome: '', colecao: '' },
  { autor: '', editora: '' },
  { autor: '', colecao: '' },
  { editora: '', colecao: '' },
  { nome: '', autor: '', editora: '' },
  { nome: '', autor: '', colecao: '' },
  { nome: '', editora: '', colecao: '' },
  { autor: '', editora: '', colecao: '' },
  { nome: '', autor: '', editora: '', colecao: '' }
];


describe.only('Testa Service de livros', () => {
  afterEach(() => sinon.restore());

  describe('Testa função de buscar todos os livros', () => {
    it('Deve retornar uma lista de livros', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaTodosLivrosRetornoDB);

      const resultado = await tdsLivros();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodosLivrosRetornoService);
    });

    it('Deve retornar uma lista vazia se não houver livros', async () => {
      sinon.stub(Livros, 'findAll').resolves([]);

      const resultado = await tdsLivros();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Livros, 'findAll').throws('Erro no banco');

      const resultado = await tdsLivros();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar todos os livros.');
    });
  });

  describe('Testa função de buscar livro pelo Id', () => {
    it('Deve retornar um livro com status 200 se encontrado', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);

      const resultado = await procuraLivroPorId(1);

      expect(stubBypk).has.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(livrosRetornoService);
    });

    it('Deve retornar status 404 se o livro não for encontrado', async () => {
      sinon.stub(Livros, 'findByPk').resolves(undefined);

      const resultado = await procuraLivroPorId(180);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Livro não encontrado.');
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Livros, 'findByPk').throws('Erro no banco');

      const resultado = await procuraLivroPorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por livro.');
    });
  });

  describe('Testa função de atualizar livro', () => {
    it('Deve atualizar um livro com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);
      const stubUpdate = sinon.stub(Livros, 'update').resolves([1]);

      const id = 1;
      const atualizacao = {
        'idColecao': 2,
        'nome': 'Sociedade do Anel',
        'idAutor': 1,
        'tenho': true,
        'lido': true,
        'idCategoria': 1,
        'idEditora': 1
      };

      const resultado = await atlizLivro(id, atualizacao);
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(atualizaLivrosRetornoService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);
      const stubUpdate = sinon.stub(Livros, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao = {
        'idColecao': 2,
        'nome': 'A Sociedade do Anel',
        'idAutor': 1,
        'tenho': true,
        'lido': true,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      const resultado = await atlizLivro(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });
  
    it('Deve retornar status 404 se o livro não for encontrado', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(undefined);
  
      const id = 200;
  
      const resultado = await atlizLivro(id, {});
  
      expect(stubBypk).to.have.been.calledWith(200);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Livro não encontrado.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Livros, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizLivro(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar livro.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);
      sinon.stub(Livros, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizLivro(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar livro.');
    });
  });

  describe('Testa função de criar novo livro', () => {
    it('Deve criar um livro com sucesso e retornar status 201', async () => {
      sinon.stub(Livros, 'findAll').resolves([]);
      const stubCreat = sinon.stub(Livros, 'create').resolves(criaLivrosRetornoDB);

      const novoLivro = {
        'idColecao': 1,
        'nome': 'Um livro muito legal',
        'idAutor': 1,
        'tenho': 1,
        'lido': 1,
        'idCategoria': 1,
        'idEditora': 1
      };

      const resultado = await criaLivro(novoLivro);

      expect(stubCreat).to.have.been.calledWith(novoLivro);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.deep.equal(criaLivrosRetornoDB.dataValues);
    });

    it('Deve retornar status 409 se o livro já existir', async () => {
      sinon.stub(Livros, 'findAll').resolves([1]);
  
      const novoLivro = {
        'idColecao': 1,
        'nome': 'Um livro muito legal',
        'idAutor': 1,
        'tenho': 1,
        'lido': 1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      const resultado = await criaLivro(novoLivro);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Livro já cadastrado no banco de dados.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Livros, 'findAll').throws('Erro no banco');
  
      const novoLivro = {
        'idColecao': 1,
        'nome': 'Um livro muito legal',
        'idAutor': 1,
        'tenho': 1,
        'lido': 1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      const resultado = await criaLivro(novoLivro);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar livro.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Livros, 'findAll').resolves([]);
      sinon.stub(Livros, 'create').throws('Erro no banco');
  
      const novoLivro = {
        'idColecao': 1,
        'nome': 'Um livro muito legal',
        'idAutor': 1,
        'tenho': 1,
        'lido': 1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      const resultado = await criaLivro(novoLivro);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar livro.');
    });
  });

  describe('Testa função de deletar livro', () => {
    it('Deve deletar um livro com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Livros, 'destroy').resolves();
  
      const id = 176;
  
      const resultado = await delLivro(id);
  
      expect(stubBypk).to.have.been.calledWith(176);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Livro deletado com sucesso.');
    });
    it('Deve retornar status 404 se o livro não for encontrado', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(undefined);
  
      const id = 176;
  
      const resultado = await delLivro(id);
  
      expect(stubBypk).to.have.been.calledWith(176);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Livro não encontrado.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Livros, 'findByPk').throws('Erro no banco');
  
      const id = 176;
  
      const resultado = await delLivro(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar livro.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Livros, 'findByPk').resolves(1);
      sinon.stub(Livros, 'destroy').throws('Erro no banco');
  
      const id = 20;
  
      const resultado = await delLivro(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar livro.');
    });
  });

  describe('Testa função de atualizar campos lido e nota', () => {
    it('Deve atualizar um livro com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livroLidoRetornoDb);
      const stubUpdate = sinon.stub(Livros, 'update').resolves([1]);
  
      const id = 1;
      const nota = 10;

      const resultado = await atlizLido(id, nota);

      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({nota, lido: 1}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(atualizaLidoRetornoService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);
      const stubUpdate = sinon.stub(Livros, 'update').resolves([0]);
    
      const id = 1;
      const nota = 10;
 
 
    
      const resultado = await atlizLido(id, nota);
    
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({nota, lido: 1}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });

      
    it('Deve retornar status 404 se o livro não for encontrado', async () => {
      sinon.stub(Livros, 'findByPk').resolves(undefined);

      const resultado = await atlizLido(180);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Livro não encontrado.');
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Livros, 'findByPk').throws('Erro no banco');

      const resultado = await atlizLido(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao atualizar livro.');
    });

    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Livros, 'findByPk').resolves(livrosRetornoDb);
      sinon.stub(Livros, 'update').throws('Erro no banco');
    
      const id = 1;
    
      const resultado = await atlizLido(id, {});
    
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar livro.');
    });
  });

  describe('Testa função de buscar livros não lidos ou que não tenho', () => {
    it('Deve retornar uma lista de livros não lidos com sucesso e retornar status 200', async () => {
      sinon.stub(utilidades, 'criaArrayFlagIncludes').returns(true);
      sinon.stub(Livros, 'findAll').resolves(retornolivrosLidoTenhoDb);
      sinon.stub(utilidades, 'formataLivrosRotasTenhoLido').returns(retornolivrosLidoTenhoService);

      const resultado = await procuraLivrosNaoLidosOuNaoTenho('lido');

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(retornolivrosLidoTenhoService);
    });

    it('Deve retornar uma lista de livros que não tenho com sucesso e retornar status 200', async () => {
      sinon.stub(utilidades, 'criaArrayFlagIncludes').returns(true);
      sinon.stub(Livros, 'findAll').resolves(retornolivrosLidoTenhoDb);
      sinon.stub(utilidades, 'formataLivrosRotasTenhoLido').returns(retornolivrosLidoTenhoService);

      const resultado = await procuraLivrosNaoLidosOuNaoTenho('tenho');

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(retornolivrosLidoTenhoService);
    });

    it('Deve retornar uma lista vazia se não houver livros não lidos e status 200', async () => {
      sinon.stub(utilidades, 'criaArrayFlagIncludes').returns(true);
      sinon.stub(Livros, 'findAll').resolves([]);
      sinon.stub(utilidades, 'formataLivrosRotasTenhoLido').returns([]);


      const resultado = await procuraLivrosNaoLidosOuNaoTenho('lido');

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar uma lista vazia se não houver livros que não tenho e status 200', async () => {
      sinon.stub(utilidades, 'criaArrayFlagIncludes').returns(true);
      sinon.stub(Livros, 'findAll').resolves([]);
      sinon.stub(utilidades, 'formataLivrosRotasTenhoLido').returns([]);


      const resultado = await procuraLivrosNaoLidosOuNaoTenho('tenho');

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      sinon.stub(utilidades, 'criaArrayFlagIncludes').returns(true);
      sinon.stub(Livros, 'findAll').throws('Erro no banco');

      const resultado = await procuraLivrosNaoLidosOuNaoTenho('lido');

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por livros.');
    });
  });

  describe('Testa função de buscar um livro de forma dinâmica', async () => {
    beforeEach(() => {
      sinon.stub(utilidades, 'defineNomeModel')
        .onCall(0).returns('Autores')
        .onCall(1).returns('Editoras')
        .onCall(2).returns('Colecoes')
        .onCall(3).returns('Categorias');
    });
    it('Deve retornar uma lista de livros quando somente "nome" é passado como parametro', async () => {
      sinon.stub(Livros, 'findAll').resolves([listaProcuraLivroDB[0]]);

      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica');

      const query = {
        nome: 'A socie'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([listaProcuraLivroService[0]]);


    });
    it('Deve retornar uma lista de livros quando somente "autor" é passado como parametro', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaProcuraLivroDB);

      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica')
        .onCall(4).returns('J. R. R. Tolkien')
        .onCall(5).returns('Martins Fontes')
        .onCall(6).returns('O Senhor dos Anéis')
        .onCall(7).returns('Literatura fantástica');

      const query = {
        autor: 'tolkien'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaProcuraLivroService);
    });
    it('Deve retornar uma lista de livros quando somente "editora" é passada como parametro', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaProcuraLivroDB);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica')
        .onCall(4).returns('J. R. R. Tolkien')
        .onCall(5).returns('Martins Fontes')
        .onCall(6).returns('O Senhor dos Anéis')
        .onCall(7).returns('Literatura fantástica');

      const query = {
        editora: 'martin'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaProcuraLivroService);
    });
    it('Deve retornar uma lista de livros quando somente "coleção" é passada como parametro', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaProcuraLivroDB);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica')
        .onCall(4).returns('J. R. R. Tolkien')
        .onCall(5).returns('Martins Fontes')
        .onCall(6).returns('O Senhor dos Anéis')
        .onCall(7).returns('Literatura fantástica');

      const query = {
        colecao: 'senhor'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaProcuraLivroService);
    });
    it('Deve retornar uma lista de livros quando "nome" e mais 1 parametro são passados', async () => {
      sinon.stub(Livros, 'findAll').resolves([listaProcuraLivroDB[0]]);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica');

      const query = {
        nome: 'sociedade',
        autor: 'tolkien'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([listaProcuraLivroService[0]]);
    });
    it('Deve retornar uma lista de livros quando 2 parametros sem ser "nome" são passados', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaProcuraLivroDB);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica')
        .onCall(4).returns('J. R. R. Tolkien')
        .onCall(5).returns('Martins Fontes')
        .onCall(6).returns('O Senhor dos Anéis')
        .onCall(7).returns('Literatura fantástica');

      const query = {
        autor: 'tolkien',
        editora: 'martin'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaProcuraLivroService);
    });
    it('Deve retornar uma lista de livros quando "nome" e mais 2 parametros são passados', async () => {
      sinon.stub(Livros, 'findAll').resolves([listaProcuraLivroDB[0]]);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica');

      const query = {
        nome: 'sociedade',
        autor: 'tolkien',
        colecao: 'aneis'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([listaProcuraLivroService[0]]);
    });
    it('Deve retornar uma lista de livros quando 3 sem ser "nome" parametros são passados', async () => {
      sinon.stub(Livros, 'findAll').resolves(listaProcuraLivroDB);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica')
        .onCall(4).returns('J. R. R. Tolkien')
        .onCall(5).returns('Martins Fontes')
        .onCall(6).returns('O Senhor dos Anéis')
        .onCall(7).returns('Literatura fantástica');

      const query = {
        autor: 'tolkien',
        editora: 'martin',
        colecao: 'dos aneis'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaProcuraLivroService);
    });
    it('Deve retornar uma lista de livros quando 4 parametros são passados', async () => {
      sinon.stub(Livros, 'findAll').resolves([listaProcuraLivroDB[0]]);
      
      sinon.stub(utilidades, 'acessaPropriedade')
        .onCall(0).returns('J. R. R. Tolkien')
        .onCall(1).returns('Martins Fontes')
        .onCall(2).returns('O Senhor dos Anéis')
        .onCall(3).returns('Literatura fantástica');

      const query = {
        nome: 'sociedade',
        autor: 'tolkien',
        editora: 'martin',
        colecao: 'dos aneis'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([listaProcuraLivroService[0]]);
    });

    it('Deve retornar uma lista vazia se não houver livros que correspondam as condições', async () => {
      sinon.stub(Livros, 'findAll').resolves([]);

      const query = {
        nome: 'sociedade',
        autor: 'bernard',
        editora: 'martin',
        colecao: 'dos aneis'
      };

      const resultado = await procuraLivro(query);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Livros, 'findAll').throws('Erro no banco');

      const resultado = await procuraLivro({});

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por livros.');
    });
  });

});