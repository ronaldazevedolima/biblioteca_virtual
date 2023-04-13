const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (_,res) => {
    res.json({ message: 'Biblioteca virtual no ar!'});
});


module.exports = app;