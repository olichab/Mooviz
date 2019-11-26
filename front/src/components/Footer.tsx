import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import '../scss/Footer.scss';

const Footer: React.SFC = () => (
  <div className="container-fluid containerFooter">
    <div className="row h-100 d-flex align-items-center">
      <div className="col-12">
        <p className="m-0">
          Made with
          <span className="icon">
            <FontAwesomeIcon icon={faHeart} />
          </span>
          ∙ Powered by Olivier Chabot ∙
          <a href="https://github.com/olichab" className="linkUnstyled">
            {' '}
            <u>Contact</u>
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default Footer;
