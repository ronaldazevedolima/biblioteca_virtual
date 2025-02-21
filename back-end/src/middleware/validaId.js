const validaId = (req, res, next) => {
  const { id } = req.params;

  if (!Number.isInteger(+id)) {
    return res.status(400).json({mensagem: 'O id precisa ser um número inteiro.'});
  }
  return next();
};

module.exports = {
  validaId
};