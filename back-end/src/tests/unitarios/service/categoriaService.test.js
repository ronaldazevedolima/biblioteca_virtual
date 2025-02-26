const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { Categorias } = require('../../../models');
const {
  tdsCategorias,
  categoriaId,
  atlizCategoria,
  criaCategoria,
  delCategoria
} = require('../../../service/categoriaService');

const {
  listaTodasCategoriasRetornoDB,
  listaTodasCategoriasRetornoService,
  categoriaRetornoDb,
  categoriaRetornoService,
  atualizaCategoriaRetornoService,
  criaCategoriaRetornoDB,
} = require('../../mocks/categoriasMock');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa Service de categorias', () => {
  beforeEach(() => sinon.restore());

  describe('Testa função de buscar todas as categorias', () => {
    it('Deve retornar uma lista de categorias', async () => {
      sinon.stub(Categorias, 'findAll').resolves(listaTodasCategoriasRetornoDB);

      const resultado = await tdsCategorias();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodasCategoriasRetornoService);
    });

    it('Deve retornar uma lista vazia se não houver categorias', async () => {
      sinon.stub(Categorias, 'findAll').resolves([]);

      const resultado = await tdsCategorias();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Categorias, 'findAll').throws('Erro no banco');

      const resultado = await tdsCategorias();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar todas as categorias.');
    });
  });

  describe('Testa função de buscar categoria pelo Id', () => {
    it('Deve retornar uma categoria com status 200 se encontrada', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(categoriaRetornoDb);

      const resultado = await categoriaId(1);

      expect(stubBypk).has.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(categoriaRetornoService);
    });

    it('Deve retornar status 404 se a categoria não for encontrada', async () => {
      sinon.stub(Categorias, 'findByPk').resolves(undefined);

      const resultado = await categoriaId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Categoria não encontrada.');
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Categorias, 'findByPk').throws('Erro no banco');

      const resultado = await categoriaId(1);

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por categoria.');
    });
  });

  describe('Testa função de atualizar categoria', () => {
    it('Deve atualizar uma categoria com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(categoriaRetornoDb);
      const stubUpdate = sinon.stub(Categorias, 'update').resolves([1]);

      const id = 1;
      const atualizacao = { nome: 'Ficção Científica' };

      const resultado = await atlizCategoria(id, atualizacao);
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(atualizaCategoriaRetornoService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(categoriaRetornoDb);
      const stubUpdate = sinon.stub(Categorias, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao = {
        nome: 'Literatura fantástica',
      };
  
      const resultado = await atlizCategoria(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });
  
    it('Deve retornar status 404 se a categoria não for encontrada', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(undefined);
  
      const id = 100;
  
      const resultado = await atlizCategoria(id, {});
  
      expect(stubBypk).to.have.been.calledWith(100);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Categoria não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Categorias, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizCategoria(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar categoria.');
    });
    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(categoriaRetornoDb);
      sinon.stub(Categorias, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizCategoria(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar categoria.');
    });
  });

  describe('Testa função de criar nova categoria', () => {
    it('Deve criar uma categoria com sucesso e retornar status 201', async () => {
      sinon.stub(Categorias, 'findAll').resolves([]);
      const stubCreat = sinon.stub(Categorias, 'create').resolves(criaCategoriaRetornoDB);

      const novaCategoria = { nome: 'Romance' };

      const resultado = await criaCategoria(novaCategoria);

      expect(stubCreat).to.have.been.calledWith(novaCategoria);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.deep.equal(criaCategoriaRetornoDB.dataValues);
    });

    it('Deve retornar status 409 se a categoria já existir', async () => {
      sinon.stub(Categorias, 'findAll').resolves([1]);
  
      const novaCategoria = {
        nome: 'Romance',
      };
  
      const resultado = await criaCategoria(novaCategoria);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Categoria já cadastrada no banco de dados.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Categorias, 'findAll').throws('Erro no banco');
  
      const novaCategoria = {
        nome: 'Romance',
      };
  
      const resultado = await criaCategoria(novaCategoria);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar categoria.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Categorias, 'findAll').resolves([]);
      sinon.stub(Categorias, 'create').throws('Erro no banco');
  
      const novaCategoria = {
        nome: 'Romance',
      };
  
      const resultado = await criaCategoria(novaCategoria);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar categoria.');
    });
  });

  describe('Testa função de deletar categoria', () => {
    it('Deve deletar uma categoria com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Categorias, 'destroy').resolves();
  
      const id = 4;
  
      const resultado = await delCategoria(id);
  
      expect(stubBypk).to.have.been.calledWith(4);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Categoria deletada com sucesso.');
    });
    it('Deve retornar status 404 se a categoria não for encontrada', async () => {
      const stubBypk = sinon.stub(Categorias, 'findByPk').resolves(undefined);
  
      const id = 4;
  
      const resultado = await delCategoria(id);
  
      expect(stubBypk).to.have.been.calledWith(4);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Categoria não encontrada.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Categorias, 'findByPk').throws('Erro no banco');
  
      const id = 4;
  
      const resultado = await delCategoria(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar categoria.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Categorias, 'findByPk').resolves(1);
      sinon.stub(Categorias, 'destroy').throws('Erro no banco');
  
      const id = 4;
  
      const resultado = await delCategoria(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar categoria.');
    });
  });
});
