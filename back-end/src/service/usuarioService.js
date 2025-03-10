const db = require('../models');
const gerarToken = require('../utilidades/tokenUtils');
const utils = require('../utilidades/utilidades');

const tdsUsrs = async () => {
  try {
    const listaUsuarios = await db.Usuarios.findAll({
      attributes: { exclude: [ 'senha'] }
    });
    return { status: 200, resposta: listaUsuarios.map(e => e.dataValues) };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar todos os usuários.' } };
  }
};

const usrId = async (id) => {
  try {
    const usuario = await db.Usuarios.findByPk(id, {
      attributes: { exclude: [ 'senha'] }
    });
    if (!usuario) {
      return { status: 404, resposta: {mensagem: 'Usuário não encontrado.'} };
  
    }
    return { status: 200, resposta: usuario.dataValues };    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao buscar por usuário.' } };
  }
};

const atlzClassficacao = async (id, classificacao) => {
  try {
    
    const usuario = await db.Usuarios.findByPk(id);
    if (!usuario) {
      return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
    }
    const [atualizado] = await db.Usuarios.update({ classificacao }, {
      where: {
        id
      }
    });
    if (atualizado) {
      return { status: 200, resposta: { mensagem: `Classificação atualizada para "${classificacao}" com sucesso.` } };
    }
  
    return { status: 208, resposta: { mensagem: `Usuário já passui a classificação "${classificacao}".` } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar usuário.' } };
  }
};

const atlizUsuario = async (id, modificacoes) => {
  try {
    
    const usrParaAtualizar = await db.Usuarios.findByPk(id, {
      attributes: { exclude: [ 'senha'] }
    });
  
    if (!usrParaAtualizar) {
      return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
    }
  
    delete modificacoes.classificacao;
    const { senha } = modificacoes;
    
    let newUserInf = modificacoes;
    
    if (senha) {
      const cripto = await utils.hashSenha(senha);
      newUserInf = {...newUserInf, senha: cripto };
    }
    const [atualizado] = await db.Usuarios.update({ ...newUserInf }, {
      where: {
        id
      }
    });
    if (atualizado) {
      const resultado = {...usrParaAtualizar.get(), ...modificacoes};
      delete resultado.senha;
      return { status: 200, resposta: resultado };
    }
  
    return { status: 204 };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao atualizar usuário.' } };
  }
};

const criaUsr = async (obj) => {
  try {
    
    const { email, senha } = obj;
  
    const usr = await db.Usuarios.findAll({ where: { email } });
  
    if (usr.length !== 0) {
      return { status: 409, resposta: { mensagem: 'Usuário já cadastrado no banco de dados.'}};
    }
  
    const cripto = await utils.hashSenha(senha);
  
    const infoUsr = {...obj, senha: cripto, classificacao: 'cliente'};
  
    const infoUsrCriado = await db.Usuarios.create(infoUsr);
    delete infoUsrCriado.dataValues.senha;
  
    const token = gerarToken.gerarToken(infoUsrCriado.dataValues);
  
    return { status: 201, resposta: { token } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao criar usuário.' } };
  }
};

const delUsr = async (id) => {
  try {
    const usuario = await db.Usuarios.findByPk(id);
    if (!usuario) {
      return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
    }
    await db.Usuarios.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Usuário deletado com sucesso.' } };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao deletar usuário.' } };
  }
};

const efetuarLogin = async (email, senha) => {
  
  try {
    const usuario = await db.Usuarios.findOne({
      where: {
        email
      }    
    });
    if (!usuario) {
      return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
    }
  
    const senhaValida = await utils.compararSenha(senha, usuario.dataValues.senha);
    if (!senhaValida) {
      return { status: 401, resposta: { mensagem: 'Senha inválida.' } };
      
    }
    
    delete usuario.dataValues.senha;
    
    const token = gerarToken.gerarToken(usuario.dataValues);
    
    return { status: 200, resposta: { token } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Erro ao efetuar login.' } };
  }

};

module.exports = {
  tdsUsrs,
  usrId,
  criaUsr,
  atlizUsuario,
  atlzClassficacao,
  delUsr,
  efetuarLogin
};
