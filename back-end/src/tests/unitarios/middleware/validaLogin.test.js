const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { esquemaLogin } = require('../../../utilidades/esquemasValidacao');
const { validaLogin } = require('../../../middleware/validaLogin');

describe('Testa middleware de validação de login', () => {
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
      senha: '123456',
      email: 'teste@teste.com'
    };

    sinon.stub(esquemaLogin, 'validate').returns(1);

    validaLogin(req, res, next);

    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
    req.body = {
      senha: '123456',
    };

    sinon.stub(esquemaLogin, 'validate').returns({error: { message: 'O campo email é obrigatório.'}});

    validaLogin(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo email é obrigatório.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
    req.body = {
      senha: '123456',
      email: ''
    };

    sinon.stub(esquemaLogin, 'validate').returns({error: { message: 'O campo email não pode ser vazio.'}});

    validaLogin(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo email não pode ser vazio.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
    req.body = {
      senha: 123456,
      email: 'teste@teste.com'
    };

    sinon.stub(esquemaLogin, 'validate').returns({error: { message: 'O campo senha deve ser uma string.'}});

    validaLogin(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo senha deve ser uma string.'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não estiver no formato correto de email', () => {
    req.body = {
      senha: '123456',
      email: 'testeteste.com'
    };

    sinon.stub(esquemaLogin, 'validate').returns({error: { message: 'O campo email deve ser no formato "email@email.com".'}});

    validaLogin(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo email deve ser no formato "email@email.com".'});
    expect(next).to.be.not.called;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não estiver no formato correto de senha', () => {
    req.body = {
      senha: '1234',
      email: 'testeteste.com'
    };

    sinon.stub(esquemaLogin, 'validate').returns({error: { message: 'O campo senha deve ser uma string alfanumérica contendo de 6 a 10 caracteres.'}});

    validaLogin(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O campo senha deve ser uma string alfanumérica contendo de 6 a 10 caracteres.'});
    expect(next).to.be.not.called;
  });
});