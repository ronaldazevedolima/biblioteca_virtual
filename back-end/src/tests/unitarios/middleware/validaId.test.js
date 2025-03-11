const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);

const { expect } = chai;

const { validaId } = require('../../../middleware/validaId');

describe('Testa middleware de validação de id', () => {
  let req, res, next;
  beforeEach(() => {
    req = { params: {id: 0} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => sinon.restore());

  it('Deve chamar "next" se as validações forem bem-sucedidas', () => {
    req.params.id = 1;


    validaId(req, res, next);

    expect(res.status).to.not.have.been.called;
    expect(res.json).to.not.have.been.called;
    expect(next).to.have.been.calledOnce;
  });

  it('Deve retornar status 400 com mensagem de erro quando campo não for um número inteiro', () => {
    req.params.id = 'de1';

    validaId(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({mensagem: 'O id precisa ser um número inteiro.'});
    expect(next).to.be.not.called;
  });

});