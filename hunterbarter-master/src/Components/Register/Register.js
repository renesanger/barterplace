import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
// import "./Register.css";

class Register extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: {
        name: "",
        email: "",
        phone: "",
        password: ""
      },
      isAuthenticated: false
    };
  }
  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
      return;
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
  onNameChange = event => {
    //console.log(event.target.value)
    this.setState({ name: event.target.value });
  };
  onPhoneChange = event => {
    //console.log(event.target.value)
    this.setState({ phone: event.target.value });
  };
  onSubmitRegister = () => {
    fetch(
      `https://hunterbarter.herokuapp.com/user?username=${
        this.state.email
      }&password=${this.state.password}&phone=${this.state.phone}`,
      {
        method: "put",
        headers: { "Content-Type": "application/json" }
      }
    )
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          this.props.loadUser(data);
          this.setState({
            isAuthenticated: true
          });
        }
      });
  };

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.onSubmitRegister();
    }
  };

  render() {
    if (this.state.isAuthenticated === true) return <Redirect to="/" />;

    return (
      <div className="container">
        <div className="Register">
          <div>
            <Typography variant="h3" color="primary">
              Hunter Barterplace
            </Typography>
            <div>
              <TextField
                label="Enter Name"
                placeholder="Name"
                className="TextField"
                margin="normal"
                variant="outlined"
                onChange={this.onNameChange}
              />
            </div>
            <div>
              <TextField
                label="Enter Phone Number"
                placeholder="(505) 500-5000"
                className="TextField"
                margin="normal"
                variant="outlined"
                onChange={this.onPhoneChange}
              />
            </div>
            <TextField
              label="Enter Email"
              defaultValue="@myhunter.cuny.edu"
              margin="normal"
              className="TextField"
              variant="outlined"
              onChange={this.onEmailChange}
            />
          </div>
          <div>
            <TextField
              label="Enter Password"
              placeholder="Password"
              className="TextField"
              type="password"
              margin="normal"
              variant="outlined"
              onChange={this.onPasswordChange}
              onKeyPress = {this.handleKeyPress}
            />
          </div>
          <br />
          <div>
            <div>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                onClick={this.onSubmitRegister}
              >
                Register
              </Button>
            </div>
            <Link to={"/Login"} style={{ textDecoration: "none" }}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                style={{ margin: 10 }}
              >
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
