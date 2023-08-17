import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";

import "./Login.css";

class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      isAuthenticated: false
    };
  }
  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    } else {
      this.setState({
        isAuthenticated: false
      });
    }
  }
  onEmailChange = event => {
    //console.log(event.target.value)
    this.setState({ email: event.target.value });
  };
  onPasswordChange = event => {
    //console.log(event.target.value)
    this.setState({ password: event.target.value });
  };
  onSubmitSignIn = () => {
    // console.log(this.state.event)
    // console.log(this.state.password)
    // console.log(this.state.isAuthenticated);
    fetch(
      `https://hunterbarter.herokuapp.com/auth/login?username=${
        this.state.email
      }&password=${this.state.password}`,
      {
        method: "get",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          //console.log("sending back the user");
          this.props.loadUser(data);
          this.setState({
            isAuthenticated: true
          });
        }
      });
  };

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.onSubmitSignIn();
    }
  };

  render() {
    if (this.state.isAuthenticated === true) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="Login">
          <div>
            <Typography variant="h3" color="primary">
              Hunter Barterplace
            </Typography>
          </div>
          <div>
            <TextField
              //id="outlined-with-placeholder"
              label="Email"
              defaultValue="@myhunter.cuny.edu"
              type="text"
              className="TextField"
              margin="normal"
              variant="outlined"
              onChange={this.onEmailChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-password-input"
              label="Password"
              className="TextField"
              type="Password"
              margin="normal"
              variant="outlined"
              onChange={this.onPasswordChange}
              onKeyPress = {this.handleKeyPress}
            />
          </div>
          <div>
            <div>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={() => this.onSubmitSignIn()}
                style={{ margin: 10 }}
              >
                Log In
              </Button>
            </div>
            <Link to={"/Register"} style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                style={{ margin: 10 }}
              >
                Register
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
