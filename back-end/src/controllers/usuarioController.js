const { usurioService } = require('../service');

const tdsUsrs = async (req, res) => {
    const { status, resposta } = await usurioService.tdsUsrs();
    return res.status(status).json(resposta);
};

const usrId = async (req, res) => {
    const { id } = req.params;
    const { status, resposta } = await usurioService.usrId(id);
    return res.status(status).json(resposta);
};

const criaUsr = async (req, res) => {
    const usrInfo = req.body;
    const { status, resposta } = await usurioService.criaUsr(usrInfo);
    return res.status(status).json(resposta);
};

const atlizUsuario = async (req, res) => {
    const userInfo = req.body;
    const { id } = req.params;
    const { status, resposta } = await usurioService.atlizUsuario(id, userInfo);
    return res.status(status).json(resposta);
};

const atlzClassficacao = async (req, res) => {
    const { id } = req.params;
    const { classificacao } = req.body;
    const { status, resposta } = await usurioService.atlzClassficacao(id, classificacao);
    return res.status(status).json(resposta);
};

const delUsr = async (req, res) => {
    const { id } = req.params;
    const { status, resposta } = await usurioService.delUsr(id);
    return res.status(status).json(resposta);
};

module.exports = {
    tdsUsrs,
    usrId,
    criaUsr,
    atlizUsuario,
    atlzClassficacao,
    delUsr,
};
