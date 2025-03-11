const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const utils = require('../../../utilidades/utilidades');
const { esquemaLivros, esquemaPutLivros, esquemaPatchLivrosLido } = require('../../../utilidades/esquemasValidacao');
const { validaLivros, validaPutLivros, validapatchLivrosLido, validaExistenciaCampos } = require('../../../middleware/validaLivros');
const { retornoCriaEntradas } = require('../../mocks/utilidadesMock');

describe('Testa middleware de validação de Livros', () => {
  let req, res, next;
  beforeEach(() => {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => sinon.restore());

  describe('Testa função validaLivros', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns(1);
  
      validaLivros(req, res, next);
  
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
      req.body = {
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nome é obrigatório.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome é obrigatório.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
      req.body = {
        'nome': '',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nome não pode ser vazio.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome não pode ser vazio.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
      req.body = {
        'nome': 3555,
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nome deve ser uma string.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve ser uma string.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
      req.body = {
        'nome': '355',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nome deve conter no minimo 4 caracteres.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve conter no minimo 4 caracteres.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não for um numero', () => {
      req.body = {
        'nome': '3555',
        'idColecao': '1',
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo idColecao deve ser um numero.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo idColecao deve ser um numero.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo for menor que um numero mínimo', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': -1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nota deve ser igual ou maior que 0.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser igual ou maior que 0.'});
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo for maior que um numero máximo', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 11,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo nota deve ser igual ou menor que 10.'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser igual ou menor que 10.'});
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo for diferente de 0 ou 1', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 2,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub( esquemaLivros, 'validate').returns({error: { message: 'O campo tenho deve ser 0 ou 1'}});
  
      validaLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo tenho deve ser 0 ou 1'});
      expect(next).to.be.not.called;
    });
  
  });

  describe('Testa função validaPutLivros', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns(1);
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
      req.body = {
        'nome': '',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo nome não pode ser vazio.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome não pode ser vazio.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
      req.body = {
        'nome': 3555,
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo nome deve ser uma string.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve ser uma string.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
      req.body = {
        'nome': '355',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo nome deve conter no minimo 4 caracteres.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve conter no minimo 4 caracteres.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não for um numero', () => {
      req.body = {
        'nome': '3555',
        'idColecao': '1',
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo idColecao deve ser um numero.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo idColecao deve ser um numero.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo for menor que um numero mínimo', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': -1,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo nota deve ser igual ou maior que 0.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser igual ou maior que 0.'});
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo for maior que um numero máximo', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 11,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo nota deve ser igual ou menor que 10.'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({ mensagem: 'O campo nota deve ser igual ou menor que 10.' });
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo for diferente de 0 ou 1', () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 2,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
  
      sinon.stub(esquemaPutLivros, 'validate').returns({error: { message: 'O campo tenho deve ser 0 ou 1'}});
  
      validaPutLivros(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo tenho deve ser 0 ou 1'});
      expect(next).to.be.not.called;
    });
  
  });

  describe('Testa função validaPathLivrosLido', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
      req.body = {
        nota: 5
      };
  
      sinon.stub(esquemaPatchLivrosLido, 'validate').returns(1);
  
      validapatchLivrosLido(req, res, next);
  
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
      req.body = {
      };
  
      sinon.stub(esquemaPatchLivrosLido, 'validate').returns({error: { message: 'O campo nota é obrigatório.'}});
  
      validapatchLivrosLido(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota é obrigatório.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo não for um numero', () => {
      req.body = {
        nota: '5'
      };
  
      sinon.stub( esquemaPatchLivrosLido, 'validate').returns({error: { message: 'O campo nota deve ser um numero.'}});
  
      validapatchLivrosLido(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser um numero.'});
      expect(next).to.be.not.called;
    });
  
    it('Deve retornar status 400 com mensagem de erro quando campo for menor que um numero mínimo', () => {
      req.body = {
        nota: -1
      };
  
      sinon.stub(esquemaPatchLivrosLido, 'validate').returns({error: { message: 'O campo nota deve ser igual ou maior que 0.'}});
  
      validapatchLivrosLido(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser igual ou maior que 0.'});
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo for maior que um numero máximo', () => {
      req.body = {
        nota: 11
      };
  
      sinon.stub(esquemaPatchLivrosLido, 'validate').returns({error: { message: 'O campo nota deve ser igual ou menor que 10.'}});
  
      validapatchLivrosLido(req, res, next);
  
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nota deve ser igual ou menor que 10.'});
      expect(next).to.be.not.called;
    });
  
  });

  describe('testa função validaExistenciaCampos', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', async () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 1,
        'idEditora': 1
      };
      sinon.stub(utils, 'criaEntradasVerificarId').returns(retornoCriaEntradas);
      sinon.stub(utils, 'checaElementosPorId').resolves(-1);
  
      await validaExistenciaCampos(req, res, next);
  
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
  
    it('Deve retornar status 404 com mensagem de erro quando campo não existir no banco de dados', async () => {
      req.body = {
        'nome': '3555',
        'idColecao': 1,
        'idAutor': 1,
        'tenho': 1,
        'lido': 0,
        'nota': 0,
        'idCategoria': 10,
        'idEditora': 1
      };
  
      sinon.stub(utils, 'criaEntradasVerificarId').returns(retornoCriaEntradas);
      sinon.stub(utils, 'checaElementosPorId').resolves(2);
      sinon.stub(utils, 'defineNomeModel').returns('Categorias');
      sinon.stub(utils, 'formataEntradaModel').returns('categoria');
  
      await validaExistenciaCampos(req, res, next);
  
      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo idCategoria deve ser um valor existente na tabela Categorias.'});
      expect(next).to.be.not.called;
    });
  
  });
});