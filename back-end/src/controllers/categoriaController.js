const { categoriaService } = require('../service');

const tdsCategorias = async (req, res) => {
  const { status, resposta } = await categoriaService.tdsCategorias();
  return res.status(status).json(resposta);
};

const categoriaId = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await categoriaService.categoriaId(id);
  return res.status(status).json(resposta);
};

const atlizCategoria = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await categoriaService.atlizCategoria(id, req.body);
  return res.status(status).json(resposta);
};

const criaCategoria = async (req, res) => {
  const { status, resposta } = await categoriaService.criaCategoria(req.body);
  return res.status(status).json(resposta);
};

const delCategoria = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await categoriaService.delCategoria(id);
  return res.status(status).json(resposta);
};

module.exports = {
  tdsCategorias,
  categoriaId,
  atlizCategoria,
  criaCategoria,
  delCategoria,
};
