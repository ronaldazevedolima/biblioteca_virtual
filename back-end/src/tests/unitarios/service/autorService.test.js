const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { Autores } = require('../../../models');
const { 
  tdsAutores,
  autorId,
  atlizAutor,
  criaAutor,
  delAutor
} = require('../../../service/autorService');

const { listaTodosAutoresRetornoDB,
  listaTodosAutoresRetornoService,
  autorRetornoDb,
  autorRetornoService,
  atualizaAutorRetornoService,
  criaAutorRetornoDB
} = require('../../mocks/autoresMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa Service de autores', () => {
  afterEach(() => sinon.restore());

  describe('Testa função de buscar todos os autores', () => {
    it('Deve retornar uma lista de autores', async () => {

      sinon.stub(Autores, 'findAll').resolves(listaTodosAutoresRetornoDB);
  
      const resultado = await tdsAutores();
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.be.deep.equal(listaTodosAutoresRetornoService);
    });
  
    it('Deve retornar uma lista vazia se não houver autores', async () => {
      sinon.stub(Autores, 'findAll').resolves([]);
  
      const resultado = await tdsAutores();
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.be.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Autores, 'findAll').throws('Erro no banco');
      
      const resultado = await tdsAutores();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao buscar todos os autores.');
    });
  });

  describe('Testa função de buscar autor pelo Id', () => {
    it('Deve retornar um autor com status 200 se o autor for encontrado', async () => {
      const stub = sinon.stub(Autores, 'findByPk').resolves(autorRetornoDb);

      const resultado = await autorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.be.equal(200);
      expect(resultado.resposta).to.be.deep.equal(autorRetornoService);
      expect(stub).has.been.calledWith(1);
    });

    it('Deve retornar status 404 se o autor não for encontrado', async () => {
      sinon.stub(Autores, 'findByPk').resolves(undefined);

      const resultado = await autorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Autor não encontrado.');
    });

    it('Deve retornar status 500 se houver um erro na busca por Id', async () => {
      sinon.stub(Autores, 'findByPk').throws('Erro no banco');

      const resultado = await autorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao buscar por autor.');
    });

  });

  describe('Testa função de atualizar autor', () => {
    it('Deve atualizar um autor com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(autorRetornoDb);
      const stubUpdate = sinon.stub(Autores, 'update').resolves([1]);

      const id = 1;
      const atualizacao = {
        nome: 'JRR Tolkien',
        nomeCompleto: 'John Ronald Reuel Tolkien'
      };

      const resultado = await atlizAutor(id, atualizacao);

      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.be.deep.equal(atualizaAutorRetornoService);

    });
    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(autorRetornoDb);
      const stubUpdate = sinon.stub(Autores, 'update').resolves([0]);

      const id = 1;
      const atualizacao = {
        nome: 'J. R. R. Tolkien',
        nomeCompleto: 'John Ronald Reuel Tolkien'
      };

      const resultado = await atlizAutor(id, atualizacao);

      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });

    it('Deve retornar status 404 se o autor não for encontrado', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(undefined);

      const id = 100;

      const resultado = await atlizAutor(id, {});

      expect(stubBypk).to.have.been.calledWith(100);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Autor não encontrado.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Autores, 'findByPk').throws('Erro no banco');

      const id = 1;

      const resultado = await atlizAutor(id, {});

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar autor.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(autorRetornoDb);
      sinon.stub(Autores, 'update').throws('Erro no banco');

      const id = 1;

      const resultado = await atlizAutor(id, {});

      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar autor.');
    });
  });

  describe('Testa função de criar novo autor', () => {
    it('Deve criar um autor com sucesso e retornar status 201', async () => {
      sinon.stub(Autores, 'findAll').resolves([]);
      const stubCreat = sinon.stub(Autores, 'create').resolves(criaAutorRetornoDB);

      const novoAutor = {
        nome: 'Isaac Asimov',
        nomeCompleto: 'Isaac Asimov'
      };

      const resultado = await criaAutor(novoAutor);

      expect(stubCreat).to.have.been.calledWith(novoAutor);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.be.deep.equal(criaAutorRetornoDB.dataValues);
    });
    it('Deve retornar status 409 se o autor já existir', async () => {
      sinon.stub(Autores, 'findAll').resolves([1]);

      const novoAutor = {
        nome: 'Isaac Asimov',
        nomeCompleto: 'Isaac Asimov'
      };

      const resultado = await criaAutor(novoAutor);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Autor já cadastrado no banco de dados.');
    });
    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Autores, 'findAll').throws('Erro no banco');

      const novoAutor = {
        nome: 'Isaac Asimov',
        nomeCompleto: 'Isaac Asimov'
      };

      const resultado = await criaAutor(novoAutor);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar autor.');
    });
    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Autores, 'findAll').resolves([]);
      sinon.stub(Autores, 'create').throws('Erro no banco');

      const novoAutor = {
        nome: 'Isaac Asimov',
        nomeCompleto: 'Isaac Asimov'
      };

      const resultado = await criaAutor(novoAutor);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar autor.');
    });
  });

  describe('Testa função de deletar autor', () => {
    it('Deve deletar um autor com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Autores, 'destroy').resolves();

      const id = 38;

      const resultado = await delAutor(id);

      expect(stubBypk).to.have.been.calledWith(38);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Autor deletado com sucesso.');
    });
    it('Deve retornar status 404 se o autor não for encontrado', async () => {
      const stubBypk = sinon.stub(Autores, 'findByPk').resolves(undefined);

      const id = 38;

      const resultado = await delAutor(id);

      expect(stubBypk).to.have.been.calledWith(38);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Autor não encontrado.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Autores, 'findByPk').throws('Erro no banco');

      const id = 38;

      const resultado = await delAutor(id);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar autor.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Autores, 'findByPk').resolves(1);
      sinon.stub(Autores, 'destroy').throws('Erro no banco');

      const id = 38;

      const resultado = await delAutor(id);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar autor.');
    });
  });
});
