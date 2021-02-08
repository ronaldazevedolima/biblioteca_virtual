import React from 'react';

import Header from '../components/Header';
import NavBar from '../components/Navbar';

const Books = () => (
  <div>
    <Header />
    <NavBar />
    <h1>livros</h1>
    <div class="card" style={{ width: '18rem' }}>
      <div class="card-body">
        <h5 class="card-title">nome do livro</h5>
        <h6 class="card-subtitle mb-2 text-muted">autor</h6>
        <span class="card-text">colecao </span><br />
        <a href="#" class="card-link">
          detalhe
        </a>
        <a href="#" class="card-link">
          editar
        </a>
      </div>
    </div>
    <button type="button" class="btn btn-success">
      Adicionar
    </button>
  </div>
);

export default Books;
