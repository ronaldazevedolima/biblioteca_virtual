# 📚 Bem-vindo a Biblioteca_virtual!

Seja bem-vindo/a ao repositório deste projeto! Aqui, você encontrará uma API desenvolvida em **Node.js** com **Express** e banco de dados **MySQL**, utilizando **Sequelize** como ORM. Toda a configuração do ambiente foi feita utilizando **Docker** e **Docker Compose** para facilitar a execução.

## 🚀 Sobre o Projeto

O objetivo deste projeto é fornecer uma API robusta para gerenciar livros, autores e coleções, permitindo operações como criação, leitura, atualização e exclusão de registros. Além disso, a API está documentada com **Swagger**, facilitando o entendimento e a interação com os endpoints.

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize (ORM)**
- **Docker & Docker Compose**
- **Swagger (Documentação da API)**

## 📦 Como Rodar o Projeto

Antes de começar, certifique-se de ter o **Docker** e **Docker Compose** instalados em sua máquina.

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/ronaldazevedolima/biblioteca_virtual
cd BIBLIOTECA_VIRTUAL
```

### 2️⃣ Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e preencha com as configurações necessárias:

```env
MYSQL_USER=root
MYSQL_PASSWORD=181216
MYSQL_HOST=biblioteca_db
MYSQL_DATABASE=ronald_livros
PORT=3002
JWT_SECRET=ronaldBibliotecaVirtual
```

### 3️⃣ Suba os Containers com Docker Compose

```bash
docker-compose up -d
```

Isso irá subir os containers do banco de dados e da aplicação.

### 4️⃣ Crie e popule o banco de dados

```bash
# comando para "entar" no container
docker exec -it back-end sh
# comando para criar e popular o banco de dados
npm run restart:db
```
Se quiser acompanhar os logs da aplicação em tempo real

```bash
docker logs -f back-end
```

### 5️⃣ Acesse a API

A API estará disponível em `http://localhost:3002`

## 📖 Documentação com Swagger

Para visualizar a documentação da API, acesse:

```
http://localhost:3002/api-docs
```

Aqui você pode testar os endpoints diretamente pelo navegador!

## 🔜 Próximos Passos

- ✅ Implementar autenticação.
- ✅ Implementar testes automatizados.

Sinta-se à vontade para contribuir com sugestões e melhorias! 😊

---

🔗 **Conecte-se comigo:** [LinkedIn](https://www.linkedin.com/in/ronald-limaa/) | [GitHub](https://github.com/ronaldazevedolima)

