const { esquemaCategoria } = require('../utilidades/esquemasValidacao');

const validaCategoria = async (req, res, next) => {
  const { error } = esquemaCategoria.validate(req.body);
  if (error) return res.status(400).json({ mensagem: error.details[0].message });
  next();
};

module.exports = validaCategoria;
