const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { esquemaUsuario } = require('../../../utilidades/esquemasValidacao');
const { validaUsrInfo, validaClassificacao} = require('../../../middleware/validaUsr');

describe('Testa middleware de validação de usuário', () => {
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

  describe('Testa função validaUsrInfo', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
      req.body = {
        nome: 'ronald',
        email: 'email@email.com',
        senha: '1234567'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns(1);
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
      req.body = {
        email: 'email@email.com',
        senha: '1234567'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo nome é obrigatório.'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome é obrigatório.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
      req.body = {
        nome: '',
        email: 'email@email.com',
        senha: '1234567'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo nome não pode ser vazio.'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome não pode ser vazio.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo não for uma string', () => {
      req.body = {
        nome: 12345,
        email: 'email@email.com',
        senha: '1234567'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo nome deve ser uma string.'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve ser uma string.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo não tiver o tamanho esperado', () => {
      req.body = {
        nome: 'ron',
        email: 'email@email.com',
        senha: '1234567'
      };
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo nome deve conter no minimo 4 caracteres.'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo nome deve conter no minimo 4 caracteres.'});
      expect(next).to.be.not.called;
    });

    it('Deve retornar status 400 com mensagem de erro quando campo não estiver no formato correto de email', () => {
      req.body = {
        nome: 'ronald',
        email: 'emailemail.com',
        senha: '1234567'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo email deve ser no formato "email@email.com".'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo email deve ser no formato "email@email.com".'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo não estiver no formato correto de senha', () => {
      req.body = {
        nome: 'ronald',
        email: 'email@email.com',
        senha: '123'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo senha deve ser uma string alfanumérica contendo de 6 a 10 caracteres.'}});
    
      validaUsrInfo(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo senha deve ser uma string alfanumérica contendo de 6 a 10 caracteres.'});
      expect(next).to.be.not.called;
    });
  });

  describe('Testa função validaClassificacao', () => {
    it('Deve chamar "next" se classificação for igual a "cliente"', () => {
      req.body = {
        classificacao: 'cliente'
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns(1);
    
      validaClassificacao(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
    
    it('Deve chamar "next" se classificação for igual a "admin"', () => {
      req.body = {
        classificacao: 'admin'
      };
      
      sinon.stub(esquemaUsuario, 'validate').returns(1);
      
      validaClassificacao(req, res, next);
      
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
      
    it('Deve retornar status 400 com mensagem de erro quando campo estiver faltando', () => {
      req.body = {
    
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo classificacao é obrigatório.'}});
    
      validaClassificacao(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo classificacao é obrigatório.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando campo estiver vazio', () => {
      req.body = {
        classificacao: ''
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo classificacao não pode ser vazio.'}});
    
      validaClassificacao(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo classificacao não pode ser vazio.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 400 com mensagem de erro quando classificação for diferente de admin ou cliente', () => {
      req.body = {
        classificacao: 'client'    
      };
    
      sinon.stub(esquemaUsuario, 'validate').returns({error: { message: 'O campo classificacao deve ser admin ou cliente.'}});
    
      validaClassificacao(req, res, next);
    
      expect(res.status).to.have.been.calledWith(400);
      expect(res.json).to.have.been.calledWith({mensagem: 'O campo classificacao deve ser admin ou cliente.'});
      expect(next).to.be.not.called;
    });
    
  });

});