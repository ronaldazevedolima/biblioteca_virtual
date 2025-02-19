const joi = require('joi');

const validaString = joi.string().min(4).required();
const validaNumeroPut = joi.number().integer().min(1).strict();
const validaNumero = joi.number().integer().min(1).required().strict();
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
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});

const esquemaCategoria = joi.object({
  nome: validaString,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});

const esquemaColecao = joi.object({
  nome: validaString,
  volumes: validaNumero,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'number.min': 'O campo {{#key}} deve ser maior que {{#limit}}.',
    'number.base': 'O campo {{#key}} deve ser um numero.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});

const esquemaEditora = joi.object({
  nome: validaString,
}).options({
  messages: {
    'any.required': 'O campo {{#key}} é obrigatório.',
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});

const esquemaLivros = joi.object({
  idColecao: validaNumero,
  nome: validaString,
  idAutor: validaNumero,
  tenho: joi.valid(0, 1).required(),
  lido: joi.valid(0, 1).required(),
  nota: joi.number().integer().min(1).max(10).required().strict(),
  idCategoria: validaNumero,
  idEditora: validaNumero, 
}).options({
  messages:{
    'any.required': 'O campo {{#key}} é obrigatório.',
    'any.only': 'O campo {{#key}} deve ser 0 ou 1',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'number.min': 'O campo {{#key}} deve ser igual ou maior que {{#limit}}.',
    'number.max': 'O campo {{#key}} deve ser igual o menor que {{#limit}}.',
    'number.base': 'O campo {{#key}} deve ser um numero.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});


const esquemaPutLivros = joi.object({
  idColecao: validaNumeroPut,
  nome: joi.string().min(4),
  idAutor: validaNumeroPut,
  tenho: joi.valid(0, 1),
  lido: joi.valid(0, 1),
  nota: joi.number().integer().min(1).max(10).strict(),
  idCategoria: validaNumeroPut,
  idEditora: validaNumeroPut, 
}).options({
  messages:{
    'any.only': 'O campo {{#key}} deve ser 0 ou 1',
    'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.',
    'string.empty': 'O campo {{#key}} não pode ser vazio.',
    'number.min': 'O campo {{#key}} deve ser igual ou maior que {{#limit}}.',
    'number.max': 'O campo {{#key}} deve ser igual o menor que {{#limit}}.',
    'number.base': 'O campo {{#key}} deve ser um numero.',
    'string.base': 'O campo {{#key}} deve ser uma string.'
  }
});

module.exports = {
  esquemaLogin,
  esquemaPutLivros,
  esquemaClassificacao,
  esquemaAutor,
  esquemaCategoria,
  esquemaColecao,
  esquemaEditora,
  esquemaLivros,
};
