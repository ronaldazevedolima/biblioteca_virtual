const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { esquemaColecao } = require('../../../utilidades/esquemasValidacao');
const validaColecao = require('../../../middleware/validaColecao');

describe('Testa middleware de validação de coleções', () => {
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

  it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
    req.body = {
      nome: 'O retorno',
      volumes: 1
    };

    sinon.stub(esquemaColecao, 'validate').returns(1);

    validaColecao(req, res, next);

    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
    req.body = {
      nome: 'O retorno',
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo volumes é obrigatório.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo volumes é obrigatório.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
    req.body = {
      nome: '',
      volumes: 1
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo nome não pode ser vazio.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome não pode ser vazio.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
    req.body = {
      nome: 0,
      volumes: 1    
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo nome deve ser uma string.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve ser uma string.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
    req.body = {
      nome: 'O',
      volumes: 1    
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo nome deve conter no minimo 4 caracteres.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve conter no minimo 4 caracteres.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não for um numero', () => {
    req.body = {
      nome: 'O retorno',
      volumes: '1'    
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo vulumes deve ser um numero.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo vulumes deve ser um numero.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo for menor que um numero mínimo', () => {
    req.body = {
      nome: 'O retorno',
      volumes: 0    
    };

    sinon.stub(esquemaColecao, 'validate').returns({error: { message: 'O campo vulumes deve ser maior que 0.'}});

    validaColecao(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo vulumes deve ser maior que 0.'});
    expect(next).to.be.not.called;
  });

});