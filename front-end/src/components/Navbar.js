import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link" to="/about">
          Perfil
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/authors">
          Autores
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/books">
          Livros
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/collections">
          Coleções
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/">
          Sair
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;
