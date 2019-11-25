import React, { Component, lazy, Suspense } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';

import PrivateRoute from './components/privateRoute/PrivateRoute';

import './App.scss';
import Spinner from './components/Spinner';
import NotFound from './components/NotFound';
import Header from './components/Header';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AddMovie from './components/movies/AddMovie';
import Footer from './components/Footer';
import ToastMessage from './components/ToastMessage';
import { AppState } from './store';
import { getProfileFetch } from './store/auth/authAction';
import { IToastMsg } from './store/movie/types';

const Home = lazy(() => import('./components/Home'));
const Collection = lazy(() => import('./components/movies/Collection'));
const Profile = lazy(() => import('./components/users/Profile'));
const renderSpinner = () => <Spinner />;

interface IAppProps {
  getProfileFetch: Function;
  isLogged: boolean;
  isRegister: boolean;
  toastMsg: IToastMsg;
  toastMsgAuth: IToastMsg;
  toastMsgUser: IToastMsg;
}

class App extends Component<IAppProps> {
  componentDidMount() {
    const { getProfileFetch } = this.props;
    getProfileFetch();
  }

  render() {
    const {
      isLogged,
      isRegister,
      toastMsg,
      toastMsgAuth,
      toastMsgUser,
    } = this.props;

    return (
      <div className="App">
        <Router>
          <Header />
          <Suspense fallback={renderSpinner()}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signin">
                {isLogged ? <Redirect to="/collection" /> : <SignIn />}
              </Route>
              <Route path="/signup" component={SignUp}>
                {isRegister ? <Redirect to="/signin" /> : <SignUp />}
              </Route>
              <PrivateRoute
                path="/collection"
                component={Collection}
                isLogged={isLogged}
              />
              <PrivateRoute
                path="/addmovie"
                component={AddMovie}
                isLogged={isLogged}
              />
              <PrivateRoute
                path="/profile"
                component={Profile}
                isLogged={isLogged}
              />
              <Route path="*" component={NotFound} />
            </Switch>
          </Suspense>
          <Footer />
          {(toastMsg.title !== ''
            || toastMsgAuth.title !== ''
            || toastMsgUser.title !== '') && (
            <div>
              <ToastMessage />
            </div>
          )}
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLogged: state.auth.isLogged,
  isRegister: state.auth.isRegister,
  toastMsg: state.movie.toastMsg,
  toastMsgAuth: state.auth.toastMsg,
  toastMsgUser: state.user.toastMsg,
});

export default connect(mapStateToProps, { getProfileFetch })(App);
