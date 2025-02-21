const express = require('express');
const setupSwagger = require('../swaggerConfig.js');

const {
  autorRouter,
  categoriaRouter,
  colecaoRouter,
  editoraRouter,
  livrosRouter,
  usuarioRouter
} = require('./routes');

const app = express();
app.use(express.json());
setupSwagger(app);

app.get('/', (_,res) => {
  res.json({ message: 'Biblioteca virtual no ar!'});
});

app.use('/autores', autorRouter);

app.use('/categorias', categoriaRouter);

app.use('/colecoes', colecaoRouter);

app.use('/editoras', editoraRouter);

app.use('/livros', livrosRouter);

app.use('/usuarios', usuarioRouter);

module.exports = app;
