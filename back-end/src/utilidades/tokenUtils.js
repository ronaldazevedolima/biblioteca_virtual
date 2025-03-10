const  JWT = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const gerarToken = (dados) => JWT.sign(dados, jwtSecret);

const verificarToken = (token) => {
  try {
    const InfoDecodificada = JWT.verify(token, jwtSecret);
    return InfoDecodificada;
  } catch (error) {
    return undefined;
  }
};

module.exports = {
  gerarToken,
  verificarToken,
};