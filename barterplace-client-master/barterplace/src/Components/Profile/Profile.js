import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      phone: ""
    };
  }
  componentDidMount() {
    this.setState({
      name: this.props.user.name,
      phone: this.props.user.phone
    });
  }

  submitProfile = () => {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      fetch(
        `https://hunterbarter.herokuapp.com/user/update?name=${
          this.state.name
        }&phone=${this.state.phone}`,
        {
          method: "post",
          headers: {
            Authorization: auth
          }
          // body: { name: this.state.name, phone: this.state.phone }
        }
      )
        .then(response => response.json())
        .then(res => this.props.close());
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  fileSelectHandler = event => {
    this.setState({ selectedFile: event.target.files[0] });
    console.log("selectedFile");
  };

  render() {
    console.log(this.props.user);
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="AddItem">
        <h1>Profile</h1>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          label="Phone Number"
          value={this.state.phone}
          onChange={this.handleChange("phone")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <div className="buttons">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.submitProfile}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            size="large"
            color="secondary"
            onClick={this.props.close}
          >
            Close
          </Button>
        </div>
      </div>
    );
  }
}

export default AddItem;
