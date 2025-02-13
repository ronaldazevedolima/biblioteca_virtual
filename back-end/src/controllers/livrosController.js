const { livroService } = require('../service');

const tdsLivros = async (req, res) => {
  const { status, resposta } = await livroService.tdsLivros();
  res.status(status).json(resposta);
};

const livroPorId = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await livroService.procuraLivroPorId(id);
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

const atlizLido = async(req, res) => {
  const { id } = req.params;
  const { nota } = req.body;
  const { status, resposta } = await livroService.atlizLido(id, nota);
  res.status(status).json(resposta);
};

const delLivro = async (req, res) => {
  const { id } = req.params;
  const { status, resposta } = await livroService.delLivro(id);
  res.status(status).json(resposta);
};

const procuraLivro = async (req, res) => {
  const { query } = req;
  const { status, resposta } = await livroService.procuraLivro(query);
  if (resposta.length === 0) {
    return res.status(status).json({ mensagem: 'Nenhum livro encontrado' });
  }
  res.status(status).json(resposta);
};

const livrosNaoLidos = async (req, res) => {
  const { status, resposta } = await livroService.procuraLivrosNaoLidosOuNaoTenho('lido');
  res.status(status).json(resposta);
};

const livrosNaoTenho = async (req, res) => {
  const { status, resposta } = await livroService.procuraLivrosNaoLidosOuNaoTenho('tenho');
  res.status(status).json(resposta);
};

module.exports = {
  procuraLivro,
  tdsLivros,
  livroPorId,
  criaLivro,
  atlzLivro,
  atlizLido,
  delLivro,
  livrosNaoLidos,
  livrosNaoTenho,
};
