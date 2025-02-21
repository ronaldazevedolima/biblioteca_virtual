# 📚 Biblioteca Virtual / Virtual Library

🇧🇷 **[Português](#-versao-em-portugues)**  
🇺🇸 **[English](#-english-version)**

---

## 🇧🇷 Versão em Português

Seja bem-vindo/a ao repositório deste projeto! Aqui, você encontrará uma API desenvolvida em **Node.js** com **Express** e banco de dados **MySQL**, utilizando **Sequelize** como ORM. Toda a configuração do ambiente foi feita utilizando **Docker** e **Docker Compose** para facilitar a execução.

### 🚀 Sobre o Projeto
O objetivo deste projeto é fornecer uma API robusta para gerenciar livros, autores e coleções, permitindo operações como criação, leitura, atualização e exclusão de registros. Além disso, a API está documentada com **Swagger**, facilitando o entendimento e a interação com os endpoints.

### 🛠️ Tecnologias Utilizadas
- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize (ORM)**
- **Docker & Docker Compose**
- **Swagger (Documentação da API)**

### 📦 Como Rodar o Projeto
Antes de começar, certifique-se de ter o **Docker** e **Docker Compose** instalados em sua máquina.

#### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/ronaldazevedolima/biblioteca_virtual
cd BIBLIOTECA_VIRTUAL
```

#### 2️⃣ Configure as Variáveis de Ambiente
Crie um arquivo `.env` no diretório back-end do projeto e preencha com as configurações necessárias:

```env
MYSQL_USER=root
MYSQL_PASSWORD=181216
MYSQL_HOST=biblioteca_db
MYSQL_DATABASE=ronald_livros
PORT=3002
JWT_SECRET=ronaldBibliotecaVirtual
SALTOS=11
```

#### 3️⃣ Suba os Containers com Docker Compose
```bash
docker-compose up -d
```

#### 4️⃣ Crie e Popule o Banco de Dados
```bash
docker exec -it back-end sh
npm run restart:db
```

#### 5️⃣ Acesse a API
A API estará disponível em `http://localhost:3002`

### 📖 Documentação com Swagger
Acesse:
```
http://localhost:3002/api-docs
```

### 🔜 Próximos Passos
- ✅ Implementar autenticação.
- ✅ Implementar testes automatizados.

Sinta-se à vontade para contribuir! 😊

---

## 🇺🇸 English Version

Welcome to this project repository! Here, you will find an API developed with **Node.js**, **Express**, and a **MySQL** database, using **Sequelize** as an ORM. The entire environment setup is done using **Docker** and **Docker Compose** for easier execution.

### 🚀 About the Project
The goal of this project is to provide a robust API for managing books, authors, and collections, allowing operations such as creation, reading, updating, and deleting records. Additionally, the API is documented with **Swagger**, making it easier to understand and interact with the endpoints.

### 🛠️ Technologies Used
- **Node.js**
- **Express.js**
- **MySQL**
- **Sequelize (ORM)**
- **Docker & Docker Compose**
- **Swagger (API Documentation)**

### 📦 How to Run the Project
Before getting started, make sure you have **Docker** and **Docker Compose** installed on your machine.

#### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ronaldazevedolima/biblioteca_virtual
cd BIBLIOTECA_VIRTUAL
```

#### 2️⃣ Set Up Environment Variables
Create a `.env` file in the back-end directory and fill it with the necessary configurations:

```env
MYSQL_USER=root
MYSQL_PASSWORD=181216
MYSQL_HOST=biblioteca_db
MYSQL_DATABASE=ronald_livros
PORT=3002
JWT_SECRET=ronaldBibliotecaVirtual
SALTOS=11
```

#### 3️⃣ Start the Containers with Docker Compose
```bash
docker-compose up -d
```

#### 4️⃣ Create and Populate the Database
```bash
docker exec -it back-end sh
npm run restart:db
```

#### 5️⃣ Access the API
The API will be available at `http://localhost:3002`

### 📖 Swagger Documentation
Access:
```
http://localhost:3002/api-docs
```

### 🔜 Next Steps
- ✅ Implement authentication.
- ✅ Implement automated tests.

Feel free to contribute! 😊

