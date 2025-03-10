const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { Usuarios } = require('../../../models');
const {
  tdsUsrs,
  usrId,
  criaUsr,
  atlizUsuario,
  atlzClassficacao,
  delUsr,
  efetuarLogin
} = require('../../../service/usuarioService');

const utilidades = require('../../../utilidades/utilidades');
const gerarToken = require('../../../utilidades/tokenUtils');

const {
  listaTodosUsuariosDB,
  listaTodosUsuariosService,
  retornoAtualizaUserService,
  usuarioPorIdDb,
  usuarioCriadoDb,
  retornologinDB
} = require('../../mocks/usuariosMock');

chai.use(sinonChai);
const { expect } = chai;


describe('Testa Service de usuários', () => {
  afterEach(() => sinon.restore());

  describe('Testa função de buscar todos os usuários', () => {
    it('Deve retornar uma lista de usuários', async () => {
      sinon.stub(Usuarios, 'findAll').resolves(listaTodosUsuariosDB);

      const resultado = await tdsUsrs();
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodosUsuariosService);
    });

    it('Deve retornar uma lista vazia se não houver usuários', async () => {
      sinon.stub(Usuarios, 'findAll').resolves([]);

      const resultado = await tdsUsrs();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal([]);
    });

    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Usuarios, 'findAll').throws('Erro no banco');

      const resultado = await tdsUsrs();

      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar todos os usuários.');
    });
  });

  describe('Testa função de busca usuário por id', () => {
    it('Deve retornar um usuário com status 200 se encontrado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioPorIdDb);
  
      const resultado = await usrId(1);
  
      expect(stubBypk).has.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(listaTodosUsuariosService[0]);
    });
  
    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      sinon.stub(Usuarios, 'findByPk').resolves(undefined);
  
      const resultado = await usrId(180);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.equal('Usuário não encontrado.');
    });
  
    it('Deve retornar status 500 se houver um erro na busca', async () => {
      sinon.stub(Usuarios, 'findByPk').throws('Erro no banco');
  
      const resultado = await usrId(1);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.equal('Erro ao buscar por usuário.');
    });
  });

  describe('Testa função de atualizar usuário', () => {
    it('Deve atualizar um usuário com sucesso quando o campo senha é informado e retornar status 200', async () => {
      const hashSenha = 'ajshfs3dkfhs';      
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioPorIdDb);
      sinon.stub(utilidades, 'hashSenha').resolves(hashSenha);
      const stubUpdate = sinon.stub(Usuarios, 'update').resolves([1]);

      const id = 1;
      const atualizacao = {
        'nome': 'Ronald',
        'senha': '345676'
      };

      const resultado = await atlizUsuario(id, atualizacao);

      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({...atualizacao, senha: hashSenha}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(retornoAtualizaUserService);
    });

    it('Deve atualizar um usuário com sucesso quando o campo senha não é informado e retornar status 200', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioPorIdDb);
      const stubUpdate = sinon.stub(Usuarios, 'update').resolves([1]);

      const id = 1;
      const atualizacao = {
        'nome': 'Ronald',
      };

      const resultado = await atlizUsuario(id, atualizacao);
      
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({...atualizacao}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal(retornoAtualizaUserService);
    });

    it('Deve retornar status 204 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioPorIdDb);
      const stubUpdate = sinon.stub(Usuarios, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao = {
        'nome': 'Ronald Lima',
      };
  
      const resultado = await atlizUsuario(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith(atualizacao, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(204);
      expect(Object.keys(resultado).length).to.be.equal(1);
    });
  
    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(undefined);
  
      const id = 200;
  
      const resultado = await atlizUsuario(id, {});
  
      expect(stubBypk).to.have.been.calledWith(200);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Usuário não encontrado.');
    });

    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Usuarios, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizUsuario(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar usuário.');
    });

    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioPorIdDb);
      sinon.stub(Usuarios, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizUsuario(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar usuário.');
    });
  });

  describe('Testa função de criar novo usuário', () => {
    it('Deve criar um usuário com sucesso e retornar status 201', async () => {
      const hashSenha = 'ajshfs3dkfhs';
      const fakeToken = 'fakeToken';
      sinon.stub(Usuarios, 'findAll').resolves([]);
      sinon.stub(utilidades, 'hashSenha').resolves(hashSenha);
      const stubCreat = sinon.stub(Usuarios, 'create').resolves(usuarioCriadoDb);
      sinon.stub(gerarToken, 'gerarToken').returns(fakeToken);

      const novoUsuario = {
        'nome': 'Aryadne',
        'email': 'aryadne@aryadne.com',
        'senha': '181216'
      };

      const resultado = await criaUsr(novoUsuario);

      expect(stubCreat).to.have.been.calledWith({...novoUsuario, senha: hashSenha, classificacao: 'cliente'});
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(201);
      expect(resultado.resposta).to.deep.equal({token: fakeToken});
    });

    it('Deve retornar status 409 se o usuário já existir', async () => {
      sinon.stub(Usuarios, 'findAll').resolves([1]);
  
      const novoUsuario = {
        'nome': 'Aryadne',
        'email': 'aryadne@aryadne.com',
        'senha': '181216'
      };

      const resultado = await criaUsr(novoUsuario);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(409);
      expect(resultado.resposta.mensagem).to.be.equal('Usuário já cadastrado no banco de dados.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante busca', async () => {
      sinon.stub(Usuarios, 'findAll').throws('Erro no banco');
  
      const novoUsuario = {
        'nome': 'Aryadne',
        'email': 'aryadne@aryadne.com',
        'senha': '181216'
      };

      const resultado = await criaUsr(novoUsuario);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar usuário.');
    });

    it('Deve retornar status 500 se houver um erro na criação durante criação', async () => {
      sinon.stub(Usuarios, 'findAll').resolves([]);
      sinon.stub(Usuarios, 'create').throws('Erro no banco');
  
      const novoUsuario = {
        'nome': 'Aryadne',
        'email': 'aryadne@aryadne.com',
        'senha': '181216'
      };

      const resultado = await criaUsr(novoUsuario);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao criar usuário.');
    });
  });

  describe('Testa função de deletar usuário', () => {
    it('Deve deletar um usuário com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(1);
      const stubDestroy = sinon.stub(Usuarios, 'destroy').resolves();
  
      const id = 3;
  
      const resultado = await delUsr(id);
  
      expect(stubBypk).to.have.been.calledWith(3);
      expect(stubDestroy).to.have.been.calledWith({where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta.mensagem).to.be.equal('Usuário deletado com sucesso.');
    });
    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(undefined);
  
      const id = 4;
  
      const resultado = await delUsr(id);
  
      expect(stubBypk).to.have.been.calledWith(4);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Usuário não encontrado.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante pesquisa', async () => {
      sinon.stub(Usuarios, 'findByPk').throws('Erro no banco');
  
      const id = 5;
  
      const resultado = await delUsr(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar usuário.');
    });
    it('Deve retornar status 500 se houver um erro na exclusão durante exclusão', async () => {
      sinon.stub(Usuarios, 'findByPk').resolves(1);
      sinon.stub(Usuarios, 'destroy').throws('Erro no banco');
  
      const id = 4;
  
      const resultado = await delUsr(id);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao deletar usuário.');
    });
  });

  describe('Testa função de atualizar classificação de usuário', () => {
    it('Deve atualizar a classificação do usuário com sucesso e retornar status 200', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioCriadoDb);
      const stubUpdate = sinon.stub(Usuarios, 'update').resolves([1]);

      const id = 1;
      const atualizacao = 'admin';

      const resultado = await atlzClassficacao(id, atualizacao);

      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({classificacao:atualizacao}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal({ mensagem: `Classificação atualizada para "${atualizacao}" com sucesso.` });
    });

    it('Deve retornar status 208 se a atualização não alterar nenhum dado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioCriadoDb);
      const stubUpdate = sinon.stub(Usuarios, 'update').resolves([0]);
  
      const id = 1;
      const atualizacao =  'cliente';
  
      const resultado = await atlzClassficacao(id, atualizacao);
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(stubUpdate).to.have.been.calledWith({classificacao: atualizacao}, { where: { id } });
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(208);
      expect(resultado.resposta).to.be.deep.equal({ mensagem: `Usuário já passui a classificação "${atualizacao}".` });
    });
  
    it('Deve retornar status 404 se o usuário não for encontrado', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(undefined);
  
      const id = 200;
  
      const resultado = await atlzClassficacao(id, {});
  
      expect(stubBypk).to.have.been.calledWith(200);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta.mensagem).to.be.equal('Usuário não encontrado.');
    });

    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Usuarios, 'findByPk').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizUsuario(id, {});
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar usuário.');
    });

    it('Deve retornar status 500 se houver um erro na atualização durante atualização', async () => {
      const stubBypk = sinon.stub(Usuarios, 'findByPk').resolves(usuarioCriadoDb);
      sinon.stub(Usuarios, 'update').throws('Erro no banco');
  
      const id = 1;
  
      const resultado = await atlizUsuario(id, {});
  
      expect(stubBypk).to.have.been.calledWith(1);
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao atualizar usuário.');
    });
  });


  describe('Testa função de efetuar login', () => {
    it('Deve efetuar login com sucesso e retornar status 200', async () => {
      const fakeToken = 'fakeToken';
      const stubFindOne = sinon.stub(Usuarios, 'findOne').resolves(retornologinDB);
      sinon.stub(utilidades, 'compararSenha').resolves(true);
      sinon.stub(gerarToken, 'gerarToken').returns(fakeToken);

      const dados = {
        email: 'ronald@ronald.com',
        senha: '181216'
      };

      const resultado = await efetuarLogin(dados.email, dados.senha);

      expect(stubFindOne).to.have.been.calledWith({where: {email: dados.email}});
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(200);
      expect(resultado.resposta).to.deep.equal({token: fakeToken});
    });

    it('Deve não efetuar login por senha invalida e retornar status 401', async () => {
      const stubFindOne = sinon.stub(Usuarios, 'findOne').resolves(retornologinDB);
      sinon.stub(utilidades, 'compararSenha').resolves(false);

      const dados = {
        email: 'ronald@ronald.com',
        senha: '121816'
      };

      const resultado = await efetuarLogin(dados.email, dados.senha);

      expect(stubFindOne).to.have.been.calledWith({where: {email: dados.email}});
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(401);
      expect(resultado.resposta).to.deep.equal({mensagem: 'Senha inválida.'});
    });

    it('Deve não efetuar login por usuario não encontrado e retornar status 404', async () => {
      const stubFindOne = sinon.stub(Usuarios, 'findOne').resolves(undefined);

      const dados = {
        email: 'ronald@ronald2.com',
        senha: '181216'
      };

      const resultado = await efetuarLogin(dados.email, dados.senha);

      expect(stubFindOne).to.have.been.calledWith({where: {email: dados.email}});
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(404);
      expect(resultado.resposta).to.deep.equal({mensagem: 'Usuário não encontrado.'});
    });
    it('Deve retornar status 500 se houver um erro na atualização durante a busca', async () => {
      sinon.stub(Usuarios, 'findOne').throws('Erro no banco');
  
      const dados = {
        email: 'ronald@ronald2.com',
        senha: '181216'
      };

      const resultado = await efetuarLogin(dados.email, dados.senha);
  
      expect(resultado).to.be.an('object');
      expect(resultado.status).to.equal(500);
      expect(resultado.resposta.mensagem).to.be.equal('Erro ao efetuar login.');
    });
  });
});