import * as React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

import '../scss/Home.scss';

const imgHome = require('../img/home.svg');

const Home: React.SFC = () => (
  <div className="container containerHome">
    <div className="row">
      <div className="col-12 col-md-4 p-4 title d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-auto">
            <h1>
              <strong>Mooviz</strong>
            </h1>
            <br />
            <h4>The easiest way to organize your movie collection</h4>
          </div>
          <div className="col-12 mt-5">
            <button type="button" className="btn btnGoToCollection">
              <Link to="/collection" className="linkUnstyled">
                Go to my collection
              </Link>
              <span className="icon">
                <FontAwesomeIcon icon={faLongArrowAltRight} />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-8 p-4 imgHome d-flex justify-content-center align-items-center">
        <img src={imgHome} alt="home" />
      </div>
    </div>
  </div>
);

export default Home;
