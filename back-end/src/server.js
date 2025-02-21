const app = require('./app');

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
  console.log('Swagger rodando em localhost:3002/api-docs');
});
