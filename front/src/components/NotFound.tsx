import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import '../scss/NotFound.scss';

import ProgressBar from './ProgressBar';

const imgNotFound = require('../img/404_page.svg');

interface INotFoundProps {
  redirect: boolean;
}

export default class NotFound extends Component<INotFoundProps> {
  state = { redirect: false };

  componentDidMount() {
    setTimeout(() => this.setState({ redirect: true }), 10000);
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container-fluid ">
        <div className="row d-flex justify-content-center align-items-center notFoundContainer">
          <div className="col-12 mt-4 text-center">
            <h3>Oops ! You are lost</h3>
            <p>
              The page you are looking for is not here ! Don&apos;t worry, you
              will be redirect to home page in 10 seconds
            </p>
          </div>
          <div className="col-auto">
            <ProgressBar />
          </div>
          <div className="col-12" />
          <img src={imgNotFound} alt="404 Not found" />
        </div>
      </div>
    );
  }
}
