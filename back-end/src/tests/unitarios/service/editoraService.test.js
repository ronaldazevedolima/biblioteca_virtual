const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { Editoras } = require('../../../models');
const {
  tdsEditoras,
  editoraPorId,
  atlzEditora,
  criaEditora,
  delEditora
} = require('../../../service/editoraService');

const {
  listaTodasEditorasRetornoDB,
  listaTodasEditorasRetornoService,
  editorasRetornoDb,
  editorasRetornoService,
  atualizaEditorasRetornoService,
  criaEditorasRetornoDB,
} = require('../../mocks/editorasMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa Service de editoras', () => {
  beforeEach(() => sinon.restore());

  describe('Testa função de buscar todas as editoras', () => {
    it('Deve retornar uma lista de editoras', async () => {
      sinon.stub(Editoras, 'findAll').resolves(listaTodasEditorasRetornoDB);

      const resultado = await tdsEditoras();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodasEditorasRetornoService);
    });

    it('Deve retornar uma lista vazia se não houver editoras', async () => {
      sinon.stub(Editoras, 'findAll').resolves([]);

      const resultado = await tdsEditoras();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Editoras, 'findAll').throws('Erro no banco');

      const resultado = await tdsEditoras();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar todas as editoras.');
    });
  });

  describe('Testa função de buscar editora pelo Id', () => {
    it('Deve retornar uma editora com status 200 se encontrada', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(editorasRetornoDb);

      const resultado = await editoraPorId(1);

      expect(stubBypk).has.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(editorasRetornoService);
    });

    it('Deve retornar status 404 se a editora não for encontrada', async () => {
      sinon.stub(Editoras, 'findByPk').resolves(undefined);

      const resultado = await editoraPorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Editora não encontrada.');
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Editoras, 'findByPk').throws('Erro no banco');

      const resultado = await editoraPorId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por editora.');
    });
  });

  describe('Testa função de atualizar editora', () => {
    it('Deve atualizar uma editora com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(editorasRetornoDb);
      const stubUpdate = sinon.stub(Editoras, 'update').resolves([1]);

      const id = 1;
      const atualizacao = { nome: 'Martin Fontes'};

      const resultado = await atlzEditora(id, atualizacao);
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(atualizaEditorasRetornoService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(editorasRetornoDb);
      const stubUpdate = sinon.stub(Editoras, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao = {
        nome: 'Martins Fontes'
      };
  
      const resultado = await atlzEditora(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });
  
    it('Deve retornar status 404 se a editora não for encontrada', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(undefined);
  
      const id = 100;
  
      const resultado = await atlzEditora(id, {});
  
      expect(stubBypk).to.have.been.calledWith(100);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Editora não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Editoras, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlzEditora(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar editora.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(editorasRetornoDb);
      sinon.stub(Editoras, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlzEditora(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar editora.');
    });
  });

  describe('Testa função de criar nova editora', () => {
    it('Deve criar uma editora com sucesso e retornar status 201', async () => {
      sinon.stub(Editoras, 'findAll').resolves([]);
      const stubCreat = sinon.stub(Editoras, 'create').resolves(criaEditorasRetornoDB);

      const novaEditora = { nome: 'Nova editora'};

      const resultado = await criaEditora(novaEditora);

      expect(stubCreat).to.have.been.calledWith(novaEditora);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.deep.equal(criaEditorasRetornoDB.dataValues);
    });

    it('Deve retornar status 409 se a editora já existir', async () => {
      sinon.stub(Editoras, 'findAll').resolves([1]);
  
      const novaEditora = {
        nome: 'Nova editora'
      };
  
      const resultado = await criaEditora(novaEditora);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Editora já cadastrada no banco de dados.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Editoras, 'findAll').throws('Erro no banco');
  
      const novaEditora = {
        nome: 'Nova editora'
      };
  
      const resultado = await criaEditora(novaEditora);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar editora.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Editoras, 'findAll').resolves([]);
      sinon.stub(Editoras, 'create').throws('Erro no banco');
  
      const novaEditora = {
        nome: 'Nova editora'
      };
  
      const resultado = await criaEditora(novaEditora);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar editora.');
    });
  });

  describe('Testa função de deletar editora', () => {
    it('Deve deletar uma editora com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Editoras, 'destroy').resolves();
  
      const id = 20;
  
      const resultado = await delEditora(id);
  
      expect(stubBypk).to.have.been.calledWith(20);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Editora deletada com sucesso.');
    });
    it('Deve retornar status 404 se a editora não for encontrada', async () => {
      const stubBypk = sinon.stub(Editoras, 'findByPk').resolves(undefined);
  
      const id = 20;
  
      const resultado = await delEditora(id);
  
      expect(stubBypk).to.have.been.calledWith(20);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Editora não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Editoras, 'findByPk').throws('Erro no banco');
  
      const id = 20;
  
      const resultado = await delEditora(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar editora.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Editoras, 'findByPk').resolves(1);
      sinon.stub(Editoras, 'destroy').throws('Erro no banco');
  
      const id = 20;
  
      const resultado = await delEditora(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar editora.');
    });
  });
});
