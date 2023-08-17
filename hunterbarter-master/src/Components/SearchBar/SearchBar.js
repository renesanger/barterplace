import React, { Component } from "react";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

import "./SearchBar.css";

class SeachBar extends Component {
  constructor(props) {
    super();
    this.state = {
      item: ""
    };
  }

  onNameChange = event => {
    console.log(event.target.value);
    this.setState({ item: event.target.value });
  };

  onSubmitSearch = () => {
    console.log("searching...", this.state.item);
    if (this.state.item.length > 0) {
      this.props.search(this.state.item);
    } else alert("Enter something in searchbar");
  };

  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.onSubmitSearch();
    }
  };

  render() {
    return (
      <div className="SearchBarContainer">
        <TextField
          //inputStyle={{ textAlign: "right", cursor: "none" }}
          //fullWidth
          label="Item"
          placeholder="eg: xbox"
          type="text"
          className="SearchBar"
          margin="normal"
          variant="outlined"
          onChange={this.onNameChange}
          onKeyPress = {this.handleKeyPress}
        />
        <Button
          variant="contained"
          //size="large"
          margin="normal"
          color="primary"
          className="searchButton"
          onClick={this.onSubmitSearch}
        >
          Search
        </Button>
      </div>
    );
  }
}

export default SeachBar;
