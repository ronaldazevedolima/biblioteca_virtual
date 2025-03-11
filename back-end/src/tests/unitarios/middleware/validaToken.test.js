const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const tokenUtil = require('../../../utilidades/tokenUtils');
const { validaToken, validaAdmin, validaAcesso } = require('../../../middleware/validaToken');

describe('Testa middleware de validação de token', () => {
  let req, res, next;
  beforeEach(() => {
    req = { headers: {}, user: {}, params: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => sinon.restore());

  describe('Testa função validaToken', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', async () => {
      req.headers = {
        authorization: 'portador fakeToken'
      };
    
      sinon.stub(tokenUtil, 'verificarToken').resolves(1);
    
      await validaToken(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
    
    it('Deve retornar status 401 com mensagem de erro quando o token não for passado', async () => {
      req.headers = {
      };
        
      await validaToken(req, res, next);
    
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({mensagem: 'Token de autenticação não fornecido.'});
      expect(next).to.be.not.called;
    });
    
    it('Deve retornar status 401 com mensagem de erro quando o token for invalido', async () => {
      req.headers = {
        authorization: 'portador fakeToken'
      };
    
      sinon.stub(tokenUtil, 'verificarToken').resolves(undefined);
    
      await validaToken(req, res, next);
    
      expect(res.status).to.have.been.calledWith(401);
      expect(res.json).to.have.been.calledWith({mensagem: 'Token fornecido é inválido.'});
      expect(next).to.be.not.called;
    });
    
  });

  describe('Testa função validaAdmin', () => {
    it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
      req.user = {
        classificacao: 'admin'
      };
    
    
      validaAdmin(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
    
    it('Deve retornar status 403 com mensagem de erro quando usuário não for administrador', () => {
      req.user = {
        classificacao: 'cliente'
      };
    
      validaAdmin(req, res, next);
    
      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({mensagem: 'Acesso negado, área restrita para adiministradores.'});
      expect(next).to.be.not.called;
    });
    
  });


  describe('Testa função validaAcesso', () => {
    it('Deve chamar "next" se o "id" do usuario é igual ao id da rota e a classificação é "admin"', () => {
      req.user = {
        id: 1,
        classificacao: 'admin'
      };
      req.params = {
        id: 1
      };
    
      validaAcesso(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });

    it('Deve chamar "next" se o "id" do usuario é igual ao id da rota e a classificação é "cliente"', () => {
      req.user = {
        id: 1,
        classificacao: 'cliente'
      };
      req.params = {
        id: 1
      };
    
      validaAcesso(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });

    it('Deve chamar "next" se o "id" do usuario é diferente do id da rota e a classificação é "admin"', () => {
      req.user = {
        id: 1,
        classificacao: 'admin'
      };
      req.params = {
        id: 2
      };
    
      validaAcesso(req, res, next);
    
      expect(res.status).to.not.have.been.called;
      expect(res.json).to.not.have.been.called;
      expect(next).to.have.been.calledOnce;
    });
    
    it('Deve retornar status 403 com mensagem de erro quando "id" do usuario é diferente do id da rota', () => {
      req.user = {
        id: 1,
        classificacao: 'cliente'
      };
      req.params = {
        id: 2
      };
    
    
      validaAcesso(req, res, next);
    
      expect(res.status).to.have.been.calledWith(403);
      expect(res.json).to.have.been.calledWith({mensagem: 'Acesso negado.'});
      expect(next).to.be.not.called;
    });
  });
});