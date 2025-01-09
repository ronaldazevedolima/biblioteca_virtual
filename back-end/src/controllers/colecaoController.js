const { colecaoService } = require('../service');

const tdsColecoes = async (_req, res) => {
  const { status, resposta } = await colecaoService.tdsColecoes();
  return res.status(status).json(resposta);
};

const colecaoId = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await colecaoService.colecaoId(id);
  return res.status(status).json(resposta);
};

const atlizColecao = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await colecaoService.atlizColecao(id, req.body);
  return res.status(status).json(resposta);
};

const criaColecao = async (req, res) => {
  const { status, resposta } = await colecaoService.criaColecao(req.body);
  return res.status(status).json(resposta);
};

const delColecao = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await colecaoService.delColecao(id);
  return res.status(status).json(resposta);
};

module.exports = {
  tdsColecoes,
  colecaoId,
  atlizColecao,
  criaColecao,
  delColecao,
};
