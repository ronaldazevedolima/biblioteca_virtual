const { editoraService } = require('../service');

const tdsEditoras = async (req, res) => {    
  const { status, resposta } = await editoraService.tdsEditoras();
  res.status(status).json(resposta);
};

const editoraPorId = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await editoraService.editoraPorId(id);
  res.status(status).json(resposta);
};

const criaEditora = async (req, res) => {
  const { status, resposta } = await editoraService.criaEditora(req.body);
  res.status(status).json(resposta);
};

const atlzEditora = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await editoraService.atlzEditora(id, req.body);
  res.status(status).json(resposta);
};

const delEditora = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await editoraService.delEditora(id);
  res.status(status).json(resposta);
};

module.exports = {
  tdsEditoras,
  editoraPorId,
  criaEditora,
  atlzEditora,
  delEditora,
};
