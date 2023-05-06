const db = require('../models');

const tdsUsrs = async () => {
    const listaUsuarios = await db.Usuarios.findAll();
    const filtroDados = listaUsuarios.map((el) =>{
        const { senha, ...infoASerRetornada } = el.dataValues;
        return infoASerRetornada;
    });
    return { status: 200, resposta: filtroDados }
};

const usrId = async (id) => {
    const usrInfo = await db.Usuarios.findByPk(id);
    const { senha, ...usuario} = usrInfo.dataValues;
    return { status: 200, resposta: usuario }
};

const atlzClassficacao = async (id, classificacao) => {
    const [atualizado] = await db.Usuarios.update({ classificacao: classificacao }, {
        where: {
            idUsuario: id
        }
    });
    if (atualizado) {
        return { status: 200, resposta: { mensagem: `Classificação atualizada para "${classificacao}" com sucesso.` } };
    };

    return { status: 200, resposta: { mensagem: `Usuário já passui a classificação "${classificacao}".` } };
};

const atlizUsuario = async (id, obj) => {
    const { classificacao, ...newObj } = obj;
    const [atualizado] = await db.Usuarios.update({ ...newObj }, {
        where: {
            idUsuario: id
        }
    });
    if (atualizado) {
        const usr = await usrId(id);
        return { status: 200, resposta: usr.resposta };
    };

    return { status: 200, resposta: { mensagem: 'Nenhuma informação para ser atualizada' } };
};

const criaUsr = async (obj) => {
    const { email } = obj;
    const infoUsr = {...obj, classificacao: 'cliente'};
    const usr = await db.Usuarios.findAll({ where: { email } });
    if (usr.length !== 0) {
        return { status: 409, resposta: { mensagem: 'Usuario já existente no banco de dados.'}}
    }
    const infoUsrCriado = await db.Usuarios.create(infoUsr);
    const { senha, ...usuarioCriado} = infoUsrCriado.dataValues;
    return { status: 201, resposta: usuarioCriado }
};

const delUsr = async (id) => {
    const usuario = await db.Usuarios.findByPk(id);
    if (!usuario) {
        return { status: 404, resposta: { mensagem: 'Usuário não encontrado.' } };
    }
    await db.Usuarios.destroy({ where: { idUsuario: id } });
    return { status: 200, resposta: { mensagem: 'Usuário deletado com sucesso.' } }
};


module.exports = {
   tdsUsrs,
   usrId,
   criaUsr,
   atlizUsuario,
   atlzClassficacao,
   delUsr,
};
