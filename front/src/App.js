import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import AddMovie from "./components/AddMovie";
import Footer from "./components/Footer";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addMovie" component={AddMovie} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
