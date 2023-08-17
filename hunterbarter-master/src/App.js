import React, { Component } from "react";
import { Route } from "react-router-dom";

import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import SearchBar from "./Components/SearchBar/SearchBar";

import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      isAuthed: false,
      auth: ""
    };
  }

  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthed: true,
        auth: auth
      });
      return;
    }
  }

  loadUser = data => {
    sessionStorage.setItem("barterAuth", data.token);
    this.setState({
      auth: data.token
    });
  };
  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={props => <Home {...props} auth={this.state.auth} />}
        />
        <Route
          path="/Login"
          render={props => (
            <Login
              {...props}
              loadUser={this.loadUser}
              isAuthed={this.state.isAuthed}
            />
          )}
        />

        <Route
          path="/Register"
          render={props => (
            <Register
              {...props}
              loadUser={this.loadUser}
              isAuthed={this.state.isAuthed}
            />
          )}
        />
        <Route path="/Search" render={props => <SearchBar {...props} />} />
      </div>
    );
  }
}

export default App;
