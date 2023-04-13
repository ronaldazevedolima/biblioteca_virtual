const express = require('express');

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

app.get('/', (_,res) => {
    res.json({ message: 'Biblioteca virtual no ar!'});
});

app.use('/autor', autorRouter);
app.use('/categoria', categoriaRouter);
app.use('/colecao', colecaoRouter);
app.use('/editora', editoraRouter);
app.use('/livros', livrosRouter);
app.use('/usuario', usuarioRouter);

module.exports = app;
