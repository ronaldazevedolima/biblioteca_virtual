const joi = require('joi');

const validaString = joi.string().min(4).required();
const validaRegex = (regex) => {
  return joi.string()
    .required()
    .pattern(new RegExp(regex));
}; 
const validaEmail = joi.string().email().required();

const senhaRegex = '^[a-zA-Z0-9]{6,10}$';
const classificacaoRegex = /^(admin|cliente)$/i;


const esquemaLogin = joi.object({
  nome: validaString,
  email: validaEmail,
  senha: validaRegex(senhaRegex),
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.email': 'O campo {{#key}} deve ser no formato "email@email.com".',
    'string.pattern.base':'O campo {{#key}} deve ser uma string de numeros e/ou letras contendo de 6 a 10 caracteres.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.'
  }
});

const esquemaClassificacao = joi.object({
  classificacao: validaRegex(classificacaoRegex),
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.pattern.base': 'O campo {{#key}} deve ser admin ou cliente.'
  }
});

const esquemaAutor = joi.object({
  nomeCompleto: validaString,
  nomeAutor: validaString,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.'
  }
});

const esquemaCategoria = joi.object({
  nomeCategoria: validaString,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.'
  }
});

module.exports = {
  esquemaLogin,
  esquemaClassificacao,
  esquemaAutor,
  esquemaCategoria,
};
