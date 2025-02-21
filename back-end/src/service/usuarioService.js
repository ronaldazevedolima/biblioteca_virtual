const db = require('../models');
const { gerarToken } = require('../utilidades/tokenUtils');
const { hashSenha, compararSenha } = require('../utilidades/utilidades');

const tdsUsrs = async () => {
  const listaUsuarios = await db.Usuarios.findAll({
    attributes: { exclude: [ 'senha'] }
  });

  return { status: 200, resposta: listaUsuarios };
};

const usrId = async (id) => {
  const usuario = await db.Usuarios.findByPk(id, {
    attributes: { exclude: [ 'senha'] }
  });
  if (!usuario) {
    return { status: 404, resposta: {mensagem: 'Usuário não encontrado.'} };

  }
  return { status: 200, resposta: usuario };
};

const atlzClassficacao = async (id, classificacao) => {
  const usuario = await db.Usuarios.findByPk(id);
  if (!usuario) {
    return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
  }
  const [atualizado] = await db.Usuarios.update({ classificacao: classificacao }, {
    where: {
      id
    }
  });
  if (atualizado) {
    return { status: 200, resposta: { mensagem: `Classificação atualizada para "${classificacao}" com sucesso.` } };
  }

  return { status: 208, resposta: { mensagem: `Usuário já passui a classificação "${classificacao}".` } };
};

const atlizUsuario = async (id, modificacoes) => {
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
    const cripto = await hashSenha(senha);
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
};

const criaUsr = async (obj) => {
  const { email, senha } = obj;

  const usr = await db.Usuarios.findAll({ where: { email } });

  if (usr.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Usuario já existente no banco de dados.'}};
  }

  const cripto = await hashSenha(senha);

  const infoUsr = {...obj, senha: cripto, classificacao: 'cliente'};

  const infoUsrCriado = await db.Usuarios.create(infoUsr);

  delete infoUsrCriado.dataValues.senha;

  const token = gerarToken(infoUsrCriado.dataValues);

  return { status: 201, resposta: { token } };
};

const delUsr = async (id) => {
  const usuario = await db.Usuarios.findByPk(id);
  if (!usuario) {
    return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
  }
  try {
    await db.Usuarios.destroy({ where: { id } });
    return { status: 200, resposta: { mensagem: 'Usuário deletado com sucesso.' } };
    
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Usuário não deletado.' } };
  }
};

const efetuarLogin = async (email, senha) => {
  const usuario = await db.Usuarios.findOne({
    where: {
      email
    }    
  });

  if (!usuario) {
    return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
  }

  const senhaValida = await compararSenha(senha, usuario.dataValues.senha);

  if (!senhaValida) {
    return { status: 401, resposta: { mensagem: 'Senha inválida.' } };

  }

  try {
    const token = gerarToken(usuario.dataValues);
    return { status: 200, resposta: { token } };
  } catch (error) {
    return { status: 500, resposta: { mensagem: 'Não foi possível fazer o login.' } };
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
