const db = require('../models');

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

  const { classificacao, ...newObj } = modificacoes;
  const [atualizado] = await db.Usuarios.update({ ...newObj }, {
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
  const { email } = obj;
  const infoUsr = {...obj, classificacao: 'cliente'};
  const usr = await db.Usuarios.findAll({ where: { email } });
  if (usr.length !== 0) {
    return { status: 409, resposta: { mensagem: 'Usuario já existente no banco de dados.'}};
  }
  const infoUsrCriado = await db.Usuarios.create(infoUsr);
  const { senha, ...usuarioCriado} = infoUsrCriado.dataValues;
  return { status: 201, resposta: usuarioCriado };
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


module.exports = {
  tdsUsrs,
  usrId,
  criaUsr,
  atlizUsuario,
  atlzClassficacao,
  delUsr,
};
