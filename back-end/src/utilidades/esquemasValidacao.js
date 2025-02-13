const joi = require('joi');

const validaString = joi.string().min(4).required();
const validaNumber = joi.number().integer().min(1).required().strict();
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
  nome: validaString,
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

const esquemaColecao = joi.object({
  nomeColecao: validaString,
  volumes: validaNumber,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'number.min': 'O campo {{#key}} deve ser maior que {{#limit}}.',
  }
});

const esquemaEditora = joi.object({
  nomeEditora: validaString,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.'
  }
});

const esquemaLivros = joi.object({
  idColecao: validaNumber,
  nome: validaString,
  idAutor: validaNumber,
  tenho: joi.valid(0, 1).required(),
  lido: joi.valid(0, 1).required(),
  nota: validaNumber,
  idCategoria: validaNumber,
  idEditora: validaNumber, 
}).options({
  messages:{
    'any.required': 'O campo {{#key}} é obrigatório.',
    'any.only': 'O campo {{#key}} deve ser 0 ou 1',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'number.min': 'O campo {{#key}} deve ser maior que {{#limit}}.'
  }
});

module.exports = {
  esquemaLogin,
  esquemaClassificacao,
  esquemaAutor,
  esquemaCategoria,
  esquemaColecao,
  esquemaEditora,
  esquemaLivros,
};
