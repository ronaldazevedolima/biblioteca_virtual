const { expect } = require('chai');
const sinon = require('sinon');

const JWT = require('jsonwebtoken');

const { verificarToken } = require('../../../utilidades/tokenUtils');
const { retornoVerificaToken } = require('../../mocks/usuariosMock');

describe('Testa função de verificar token', () => {
  afterEach(() => sinon.restore());
  
  it('Deve retornar as informações do usuario quando token for válido', async () => {
    sinon.stub(JWT, 'verify').resolves(retornoVerificaToken);
    const fakeToken = 'fakeToken';

    const resultado = await verificarToken(fakeToken);

    expect(resultado).to.be.deep.equal(retornoVerificaToken);

  });

  it('Deve retornar undefined quanto token for inválido', async () => {
    sinon.stub(JWT, 'verify').throws('Erro na validação do toke');
    const fakeToken = 'fakeToken';

    const resultado = await verificarToken(fakeToken);

    expect(resultado).to.be.undefined;
  });
});
