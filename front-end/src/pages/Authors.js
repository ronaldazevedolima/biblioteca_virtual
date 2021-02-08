import React from 'react';

import Header from '../components/Header';
import NavBar from '../components/Navbar';

const Authors = () => (
  <div>
    <Header />
    <NavBar />
    <h1>autores</h1>
    <div class="card" style={{ width: '18rem' }}>
      <div class="card-body">
        <h5 class="card-title">autor</h5>
        <ul>
          <li class="card-text">
            livros{' '}
            <a href="#" class="card-link">
              detalhe
            </a>
          </li>
        </ul>
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

export default Authors;
