import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./helpers/PrivateRoute";

import { getProfileFetch } from "./actions/authAction";

import Header from "./components/Header";
import Home from "./components/Home";
import Collection from "./components/Collection";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import AddMovie from "./components/AddMovie";
import Footer from "./components/Footer";
import ToastMessage from "./components/ToastMessage";

import "./App.scss";

class App extends Component {
  componentDidMount() {
    const { getProfileFetch } = this.props;
    getProfileFetch();
  }

  render() {
    const { isAuthenticated, toastMsg, toastMsgAuth } = this.props;

    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <PrivateRoute
                path="/collection"
                component={Collection}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/addmovie"
                component={AddMovie}
                isAuthenticated={isAuthenticated}
              />
            </Switch>
            <Footer />
            {(toastMsg.title !== "" || toastMsgAuth.title !== "") && (
              <div>
                <ToastMessage />
              </div>
            )}
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  toastMsg: state.movieReducer.toastMsg,
  toastMsgAuth: state.authReducer.toastMsg
});

export default connect(
  mapStateToProps,
  { getProfileFetch }
)(App);
