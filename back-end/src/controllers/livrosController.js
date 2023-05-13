const { livroService } = require('../service');

const tdsLivros = async (req, res) => {
  console.log('CONTROLERR');   
  const { status, resposta } = await livroService.tdsLivros();
  res.status(status).json(resposta);
};

const livroPorId = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await livroService.livroPorId(id);
  res.status(status).json(resposta);
};

const criaLivro = async (req, res) => {
  const { status, resposta } = await livroService.criaLivro(req.body);
  res.status(status).json(resposta);
};

const atlzLivro = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await livroService.atlzLivro(id, req.body);
  res.status(status).json(resposta);
};

const delLivro = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await livroService.delLivro(id);
  res.status(status).json(resposta);
};

module.exports = {
  tdsLivros,
  livroPorId,
  criaLivro,
  atlzLivro,
  delLivro,
};
