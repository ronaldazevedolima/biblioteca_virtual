import React from 'react';

import Header from '../components/Header';
import NavBar from '../components/Navbar';

const Collections = () => (
  <div>
    <Header />
    <NavBar />
    <h1>colecoes</h1>
    <div class="card" style={{ width: '18rem' }}>
      <div class="card-body">
        <h5 class="card-title">Nome da colecao</h5>
        <h6 class="card-subtitle mb-2 text-muted">Autor</h6>
        <ul>
          <li class="card-text">
            livros {' '}
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
  </div>
);

export default Collections;
