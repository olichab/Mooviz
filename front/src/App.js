import React, { Component } from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { connect } from "react-redux";

import { PrivateRoute } from "./helpers/PrivateRoute";

import { getProfileFetch } from "./actions/authAction";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Collection from "./components/movies/Collection";
import AddMovie from "./components/movies/AddMovie";
import Profile from "./components/users/Profile";
import ToastMessage from "./components/ToastMessage";

import "./App.scss";

class App extends Component {
  componentDidMount() {
    const { getProfileFetch } = this.props;
    getProfileFetch();
  }

  render() {
    const { isLogged, isRegister, toastMsg, toastMsgAuth, toastMsgUser } = this.props;
    return (
      <div className="App">
        <Router>
          <div>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin">
                {isLogged ? <Redirect to="/collection" /> : <SignIn />}
              </Route>
              <Route path="/signup" component={SignUp}>
                {isRegister ? <Redirect to="/signin" /> : <SignUp />}
              </Route>
              <PrivateRoute path="/collection" component={Collection} isLogged={isLogged}/>
              <PrivateRoute path="/addmovie" component={AddMovie} isLogged={isLogged}/>
              <PrivateRoute path="/profile" component={Profile} isLogged={isLogged}/>
              <Route path="*" component={() => "404 NOT FOUND"} />
            </Switch>
            <Footer />
            {(toastMsg.title !== "" || toastMsgAuth.title !== "" || toastMsgUser.title !== "") && (
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
  isLogged: state.authReducer.isLogged,
  isRegister: state.authReducer.isRegister,
  toastMsg: state.movieReducer.toastMsg,
  toastMsgAuth: state.authReducer.toastMsg,
  toastMsgUser: state.userReducer.toastMsg,
});

export default connect(
  mapStateToProps,
  { getProfileFetch }
)(App);
