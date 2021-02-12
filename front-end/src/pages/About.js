import React from 'react';
import Header from '../components/Header';
import NavBar from '../components/Navbar';

const About = () => (
  <div>
    <Header />
    <NavBar />
    <h1 class="text-center" >Fico feliz de ter você por aqui!</h1>
    <h4 class="text-center border-bottom">Um pouquinho sobre mim!</h4>
    <div>
    <ul>
      <li>Manézinho da ilha (nascido em Florianópolis)</li>
      <li>35 anos</li>
      <li>Casado e pai de uma menina Linda</li>
      <li>Formado em engenharia de aquicultura(UFSC)</li>
      <li>Dev fullstack jr em formação</li>
    </ul>
    </div>
  </div>
);

export default About;
