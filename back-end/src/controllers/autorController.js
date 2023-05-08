const { autorService } = require('../service');

const tdsAutores = async (req, res) => {
    const { status, resposta } = await autorService.tdsAutores();
    return res.status(status).json(resposta);
};

const autorId = async (req, res) => {
    const { id } = req.params;
    const { status, resposta } = await autorService.autorId(id);
    return res.status(status).json(resposta);
};

const atlizAutor = async (req, res) => {
    const { id } = req.params;
    const { status, resposta} = await autorService.atlizAutor(id, req.body);
    return res.status(status).json(resposta);
};

const criaAutor = async (req, res) => {
    const { status, resposta } = await autorService.criaAutor(req.body);
    return res.status(status).json(resposta);
};

const delAutor = async (req, res) => {
    const { id } = req.params;
    const { status, resposta } = await autorService.delAutor(id);
    return res.status(status).json(resposta);
};

module.exports = {
    tdsAutores,
    autorId,
    atlizAutor,
    criaAutor,
    delAutor,
};
