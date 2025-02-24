const  { sign, verify } = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const gerarToken = (dados) => sign(dados, jwtSecret);

const verificarToken = (token) => {
  try {
    const InfoDecodificada = verify(token, jwtSecret);
    return InfoDecodificada;
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  gerarToken,
  verificarToken,
};