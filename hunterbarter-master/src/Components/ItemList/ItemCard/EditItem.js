import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
//******************************************

//NOT WORKING MUST FIX.

//******************************************
let conditions = [
  { label: "New", value: "New" },
  { label: "Like New", value: "Like New" },
  { label: "Used", value: "Used" }
];

class EditItem extends Component {
  constructor(props) {
    super();
    this.state = {
      description: "",
      condition: ""
    };
  }
  submitItem = () => {
    const auth = sessionStorage.getItem("barterAuth");
    console.log(
      this.props.itemID,
      this.state.description,
      this.state.condition
    );
    if (auth) {
      fetch(
        `https://hunterbarter.herokuapp.com/list/update/${
          this.props.itemID
        }?description=${this.state.description}&condition=${
          this.state.condition
        }`,
        {
          method: "post",
          headers: {
            Authorization: auth
          }
        }
      )
        .then(response => response.json())
        .then(res => console.log(res));
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="AddItem">
        <h1>Edit Item</h1>
        <TextField
          label="Description"
          multiline
          rows="4"
          value={this.state.description}
          onChange={this.handleChange("description")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          select
          label="Select Condition"
          value={this.state.condition}
          onChange={this.handleChange("condition")}
          SelectProps={{}}
          helperText="Please select a condition"
          margin="normal"
          variant="outlined"
        >
          {conditions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button
          variant="contained"
          size="large"
          color="primary"
          onClick={this.submitItem}
        >
          Submit
        </Button>
      </div>
    );
  }
}

export default EditItem;
