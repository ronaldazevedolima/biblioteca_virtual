const { expect } = require('chai');
const sinon = require('sinon');

const models = require('../../../models');
const { Colecoes, Autores, Categorias, Editoras } = require('../../../models');
const { checaElementosPorId, formataEntradaModel, criaEntradasVerificarId, acessaPropriedade, formataLivrosRotasTenhoLido, criaArrayFlagIncludes } = require('../../../utilidades/utilidades'); 
const { criaEntradasMock, retornoCriaEntradas, retornoCriaFlagIncludes } = require('../../mocks/utilidadesMock');
const { retornolivrosLidoTenhoDb, retornolivrosLidoTenhoService } = require('../../mocks/livrosMock');

describe('Testa funções de soporte do código', () => {
  beforeEach(() => sinon.restore());

  describe('Testa função checaElementosPorId', () => {
    it('Deve retornar -1 com todos os elementos válidos', async () => {         
      sinon.stub(Categorias, 'findByPk').resolves(1);
      sinon.stub(Colecoes, 'findByPk').resolves(1);
      sinon.stub(Autores, 'findByPk').resolves(1);
      sinon.stub(Editoras, 'findByPk').resolves(1);
      const entradas = [
        [ 'idColecao', 1 ],
        [ 'idAutor', 1 ],
        [ 'idCategoria', 1 ],
        [ 'idEditora', 1 ]
      ];

      const resultado = await checaElementosPorId(models, entradas);

      expect(resultado).to.be.equal(-1);
    });
    it('Deve retornar o indice da entrada inválida', async () => { 
                 
      sinon.stub(Colecoes, 'findByPk').resolves(1);
      sinon.stub(Autores, 'findByPk').resolves(1);
      sinon.stub(Categorias, 'findByPk').resolves(null);
      sinon.stub(Editoras, 'findByPk').resolves(1);
      const entradas = [
        [ 'idColecao', 1 ],
        [ 'idAutor', 1 ],
        [ 'idCategoria', 100 ],
        [ 'idEditora', 1 ]
      ];

      const resultado = await checaElementosPorId(models, entradas);

      expect(resultado).to.be.equal(2);
    });
  });
  describe('Testa função FormataEntradaModel', () => {
    it('Deve retornar uma string sem a parte "id" e em letra minuscula', () => {
      const entradaParaFormatar = 'idColecao';

      const resultado = formataEntradaModel(entradaParaFormatar);

      expect(resultado).to.be.equal('colecao');
    });
  });

  describe('Testa função criaEntradasVerificarId', () => {
    it('Deve filtrar o objeto de entrada e retornar um array', () => {

      const resultado = criaEntradasVerificarId(criaEntradasMock);

      expect(resultado).to.be.deep.equal(retornoCriaEntradas);
    });
  });

  describe('Testa função acessaPropriedade', () => {
    it('Deve retornar o nome da propriedade passada como parametro da função', () => {
      const resultado = acessaPropriedade(retornolivrosLidoTenhoDb[0], 'autor');

      expect(resultado).to.be.equal('Oliver Bowden');
    });
  });

  describe('Testa função formataLivrosRotaTenhoLido', () => {
    it('Deve retornar uma lista de livros editados', () => {
      const resultado = formataLivrosRotasTenhoLido(retornolivrosLidoTenhoDb);

      expect(resultado).to.be.deep.equal(retornolivrosLidoTenhoService);
    });
  });

  describe('Testa função criaArrayFlagIncludes', () => {
    it('Deve retornar um array com as opções de busca para cada model', async () => {
      const arrCamposPossiveis = ['autor', 'editora', 'colecao', 'categoria'];

      const resultado = criaArrayFlagIncludes(models, arrCamposPossiveis);

      expect(resultado).to.be.deep.equal(retornoCriaFlagIncludes);
    });
  });

});