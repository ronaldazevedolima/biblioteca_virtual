import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <ul class="navbar-nav">
      <li class="nav-item">
        <Link class="nav-link" to="/about">
          About
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/authors">
          Authors
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/books">
          Books
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/categories">
          Categories
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/collections">
          Collections
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/home">
          Home
        </Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/publishers">
          Publishers
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
