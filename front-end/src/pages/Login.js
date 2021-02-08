import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

const Login = () => (
  <div>
    <Header />
    <h1>login</h1>
    <div class="alert alert-warning" role="alert">
      Para ter acesso a edição favor entrar em contato.
    </div>
    <div class="alert alert-dark" role="alert">
      Para visualizar use e-mail = testuser@testuser.com e password = 1234567
    </div>
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Endereço de email</label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Seu email"
        />
        <small id="emailHelp" class="form-text text-muted">
          Nunca vamos compartilhar seu email, com ninguém.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Senha</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Senha"
        />
      </div>
      <Link to="/about">
        <button type="submit" class="btn btn-primary">
          Enviar
        </button>
      </Link>
    </form>
  </div>
);

export default Login;
