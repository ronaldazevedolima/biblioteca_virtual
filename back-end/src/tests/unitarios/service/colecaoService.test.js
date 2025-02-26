const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { Colecoes } = require('../../../models');
const {
  tdsColecoes,
  colecaoId,
  atlizColecao,
  criaColecao,
  delColecao
} = require('../../../service/colecaoService');

const {
  listaTodasColecoesRetornoDB,
  listaTodasColecoesRetornoService,
  colecoesRetornoDb,
  colecoesRetornoService,
  criaColecoesRetornoDB,
  atualizaColecoesRetornoService
} = require('../../mocks/colecoesMocks');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa Service de coleções', () => {
  beforeEach(() => sinon.restore());

  describe('Testa função de buscar todas as coleções', () => {
    it('Deve retornar uma lista de coleções', async () => {
      sinon.stub(Colecoes, 'findAll').resolves(listaTodasColecoesRetornoDB);

      const resultado = await tdsColecoes();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodasColecoesRetornoService);
    });

    it('Deve retornar uma lista vazia se não houver coleções', async () => {
      sinon.stub(Colecoes, 'findAll').resolves([]);

      const resultado = await tdsColecoes();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Colecoes, 'findAll').throws('Erro no banco');

      const resultado = await tdsColecoes();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar todas as coleções.');
    });
  });

  describe('Testa função de buscar coleção pelo Id', () => {
    it('Deve retornar uma coleção com status 200 se encontrada', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(colecoesRetornoDb);

      const resultado = await colecaoId(1);

      expect(stubBypk).has.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(colecoesRetornoService);
    });

    it('Deve retornar status 404 se a coleção não for encontrada', async () => {
      sinon.stub(Colecoes, 'findByPk').resolves(undefined);

      const resultado = await colecaoId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Coleção não encontrada.');
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Colecoes, 'findByPk').throws('Erro no banco');

      const resultado = await colecaoId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por coleção.');
    });
  });

  describe('Testa função de atualizar coleção', () => {
    it('Deve atualizar uma coleção com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(colecoesRetornoDb);
      const stubUpdate = sinon.stub(Colecoes, 'update').resolves([1]);

      const id = 1;
      const atualizacao = { nome: 'Sem Coleção', volumes: 2 };

      const resultado = await atlizColecao(id, atualizacao);
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(atualizaColecoesRetornoService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(colecoesRetornoDb);
      const stubUpdate = sinon.stub(Colecoes, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao = {
        nome: 'Sem Coleção',
        volumes: 1
      };
  
      const resultado = await atlizColecao(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });
  
    it('Deve retornar status 404 se a coleção não for encontrada', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(undefined);
  
      const id = 100;
  
      const resultado = await atlizColecao(id, {});
  
      expect(stubBypk).to.have.been.calledWith(100);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Coleção não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Colecoes, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizColecao(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar coleção.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(colecoesRetornoDb);
      sinon.stub(Colecoes, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizColecao(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar coleção.');
    });
  });

  describe('Testa função de criar nova coleção', () => {
    it('Deve criar uma coleção com sucesso e retornar status 201', async () => {
      sinon.stub(Colecoes, 'findAll').resolves([]);
      const stubCreat = sinon.stub(Colecoes, 'create').resolves(criaColecoesRetornoDB);

      const novaColecao = { nome: 'Os contos da carochinha', volumes: 3 };

      const resultado = await criaColecao(novaColecao);

      expect(stubCreat).to.have.been.calledWith(novaColecao);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.deep.equal(criaColecoesRetornoDB.dataValues);
    });

    it('Deve retornar status 409 se a coleção já existir', async () => {
      sinon.stub(Colecoes, 'findAll').resolves([1]);
  
      const novaColecao = {
        nome: 'Os contos da carochinha', volumes: 3
      };
  
      const resultado = await criaColecao(novaColecao);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Coleção já cadastrada no banco de dados.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Colecoes, 'findAll').throws('Erro no banco');
  
      const novaColecao = {
        nome: 'Os contos da carochinha', volumes: 3
      };
  
      const resultado = await criaColecao(novaColecao);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar coleção.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Colecoes, 'findAll').resolves([]);
      sinon.stub(Colecoes, 'create').throws('Erro no banco');
  
      const novaColecao = {
        nome: 'Os contos da carochinha', volumes: 3
      };
  
      const resultado = await criaColecao(novaColecao);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar coleção.');
    });
  });

  describe('Testa função de deletar coleção', () => {
    it('Deve deletar uma coleção com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Colecoes, 'destroy').resolves();
  
      const id = 39;
  
      const resultado = await delColecao(id);
  
      expect(stubBypk).to.have.been.calledWith(39);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Coleção deletada com sucesso.');
    });
    it('Deve retornar status 404 se a coleção não for encontrada', async () => {
      const stubBypk = sinon.stub(Colecoes, 'findByPk').resolves(undefined);
  
      const id = 39;
  
      const resultado = await delColecao(id);
  
      expect(stubBypk).to.have.been.calledWith(39);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Coleção não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Colecoes, 'findByPk').throws('Erro no banco');
  
      const id = 39;
  
      const resultado = await delColecao(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar coleção.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Colecoes, 'findByPk').resolves(1);
      sinon.stub(Colecoes, 'destroy').throws('Erro no banco');
  
      const id = 39;
  
      const resultado = await delColecao(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar coleção.');
    });
  });
});
