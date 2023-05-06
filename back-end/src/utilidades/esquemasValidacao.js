const joi = require('joi');

const validaString = joi.string().min(4).required();
const validaSenha = joi.string()
.required()
.pattern(new RegExp('^[a-zA-Z0-9]{6,10}$'))
const validaEmail = joi.string().email().required();

const esquemaLogin = joi.object({
    nome: validaString,
    email: validaEmail,
    senha: validaSenha,
}).options({
    messages: {
        'any.required': 'O campo {{#key}} é obrigatório.',
        'string.email': 'O campo {{#key}} deve ser no formato "email@email.com".',
        'string.pattern.base':'O campo {{#key}} deve ser uma string de numeros e/ou letras contendo de 6 a 10 caracteres.',
        'string.min': 'O campo {{#key}} deve conter no minimo {{#limit}} caracteres.'
    }
});

module.exports = {
    esquemaLogin,
};
