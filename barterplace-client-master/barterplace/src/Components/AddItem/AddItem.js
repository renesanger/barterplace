import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import "./AddItem.css";

let categories = [
  { label: "Clothing", value: "Clothing" },
  { label: "Technology", value: "Technology" },
  { label: "Collectable/Art", value: "Collectable/Art" },
  { label: "Sporting Goods", value: "Sporting Goods" },
  { label: "Music", value: "Music" },
  { label: "Other", value: "Other" }
];

let conditions = [
  { label: "New", value: "New" },
  { label: "Like New", value: "Like New" },
  { label: "Used", value: "Used" }
];

class AddItem extends Component {
  constructor(props) {
    super();
    this.state = {
      name: "",
      description: "",
      selectedFile: null,
      condition: "",
      category: ""
    };
  }
  submitItem = () => {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      var form = new FormData();
      form.append("picture", this.state.selectedFile);

      fetch(
        `https://hunterbarter.herokuapp.com/list/add?item=${
          this.state.name
        }&description=${this.state.description}&condition=${
          this.state.condition
        }&category=${this.state.category}`,
        {
          method: "post",
          headers: {
            Authorization: auth
          },
          body: form
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
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="AddItem">
        <h1>Add Item</h1>
        <TextField
          label="Item Name"
          value={this.state.name}
          onChange={this.handleChange("name")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <br />
        <TextField
          label="Description"
          multiline
          rows="2"
          value={this.state.description}
          onChange={this.handleChange("description")}
          margin="normal"
          variant="outlined"
          fullWidth
        />
        <h2>Add Image</h2>
        <input type="file" onChange={this.fileSelectHandler} />
        <br />
        <TextField
          select
          label="Select Category"
          value={this.state.category}
          onChange={this.handleChange("category")}
          SelectProps={{}}
          helperText="Please select a category"
          margin="normal"
          variant="outlined"
        >
          {categories.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
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
        <div className="buttons">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.submitItem}
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
