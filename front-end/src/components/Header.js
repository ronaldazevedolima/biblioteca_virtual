import React from 'react';
import linkedin from '../utilities/linkedin.png';
import github from '../utilities/github.png';
import capa from '../utilities/capa.jpg';

const Header = () => (
  <div
    style={{
      backgroundImage: `url(${capa})`,
      backgroundPosition: 'center center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
    }}
    class="jumbotron bg-cover text-black d-flex justify-content-center"
  >
    <div class="container py-5 text-center">
      <h1 class="display-4 font-weight-bold">Biblioteca Virtual</h1>
      <p class="font-italic mb-0">de Ronald Lima</p>
    </div>
    <div>
      <div>
        <a href="https://www.linkedin.com/in/ronald-limaa/">
          <img src={linkedin} alt="linkedin logo" width="30" height="30" />
        </a>
        <a href="https://github.com/ronaldazevedolima">
          <img src={github} alt="github logo" width="30" height="30" />
        </a>
      </div>
    </div>
  </div>
);

export default Header;
