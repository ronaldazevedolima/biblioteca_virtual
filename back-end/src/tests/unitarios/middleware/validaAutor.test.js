const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { esquemaAutor } = require('../../../utilidades/esquemasValidacao');
const { validaAutor } = require('../../../middleware/validaAutor');

describe('Testa middleware de validação de autores', () => {
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
      nome: 'Ronald',
      nomeCompleto: 'Ronald lima'
    };

    sinon.stub(esquemaAutor, 'validate').returns(1);

    validaAutor(req, res, next);

    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
    req.body = {
      nome: 'Ronald',    
    };

    sinon.stub(esquemaAutor, 'validate').returns({error: { message: 'O campo nomeCompleto é obrigatório.'}});

    validaAutor(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nomeCompleto é obrigatório.'});
    expect(next).to.be.not.called;
  });
  it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
    req.body = {
      nome: 'Ronald',
      nomeCompleto: ''    
    };

    sinon.stub(esquemaAutor, 'validate').returns({error: { message: 'O campo nomeCompleto não pode ser vazio.'}});

    validaAutor(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nomeCompleto não pode ser vazio.'});
    expect(next).to.be.not.called;
  });
  it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
    req.body = {
      nome: 'Ronald',
      nomeCompleto: 0    
    };

    sinon.stub(esquemaAutor, 'validate').returns({error: { message: 'O campo nomeCompleto deve ser uma string.'}});

    validaAutor(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nomeCompleto deve ser uma string.'});
    expect(next).to.be.not.called;
  });
  it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
    req.body = {
      nome: 'Ronald',
      nomeCompleto: 'Ro'    
    };

    sinon.stub(esquemaAutor, 'validate').returns({error: { message: 'O campo nomeCompleto deve conter no minimo 4 caracteres.'}});

    validaAutor(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo nomeCompleto deve conter no minimo 4 caracteres.'});
    expect(next).to.be.not.called;
  });

});