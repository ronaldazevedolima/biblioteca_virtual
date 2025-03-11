const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { esquemaCategoria } = require('../../../utilidades/esquemasValidacao');
const validaCategoria = require('../../../middleware/validaCategoria');

describe('Testa middleware de validação de categorias', () => {
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
      nome: 'sci-fi'
    };

    sinon.stub(esquemaCategoria, 'validate').returns(1);

    validaCategoria(req, res, next);

    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
    req.body = {
    };

    sinon.stub(esquemaCategoria, 'validate').returns({error: { message: 'O campo nome é obrigatório.'}});

    validaCategoria(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome é obrigatório.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
    req.body = {
      nome: ''    
    };

    sinon.stub(esquemaCategoria, 'validate').returns({error: { message: 'O campo nome não pode ser vazio.'}});

    validaCategoria(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome não pode ser vazio.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
    req.body = {
      nome: 0    
    };

    sinon.stub(esquemaCategoria, 'validate').returns({error: { message: 'O campo nome deve ser uma string.'}});

    validaCategoria(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve ser uma string.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
    req.body = {
      nome: 'sci'    
    };

    sinon.stub(esquemaCategoria, 'validate').returns({error: { message: 'O campo nome deve conter no minimo 4 caracteres.'}});

    validaCategoria(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve conter no minimo 4 caracteres.'});
    expect(next).to.be.not.called;
  });

});