import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";
import { Redirect } from "react-router-dom";

import Navigation from "../Navigation/Navigation";
import AddItem from "../AddItem/AddItem";
import Profile from "../Profile/Profile";
import ItemList from "../ItemList/ItemList";
import SearchBar from "../SearchBar/SearchBar";
import FilterItem from "../FilterItem/FilterItem";

import TextField from "@material-ui/core/TextField";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

import logo from "./hunter-college-logo.png";
import "./Home.css";

let categories = [
  { label: "", value: "" },
  { label: "Clothing", value: "Clothing" },
  { label: "Technology", value: "Technology" },
  { label: "Collectable/Art", value: "Collectable/Art" },
  { label: "Sporting Goods", value: "Sporting Goods" },
  { label: "Music", value: "Music" },
  { label: "Other", value: "Other" }
];

let conditions = [
  { label: "", value: "" },
  { label: "New", value: "New" },
  { label: "Like New", value: "Like New" },
  { label: "Used", value: "Used" }
];

//import Navbar from "../Navbar/Navbar";
class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      user: {},
      addItemModal: false,
      showProfile: false,
      //by default render all items. dont know if you wanna make it have a
      //different behavior
      renderList: "Items",
      currpage: "Items",
      page: 1,
      labelWidth: 0,
      condition: "",
      category: "",
      item: ""
    };
  }
  handleChange = name => event => {
    this.setState({ [name]: event.target.value, page: 1 });
    this.renderFilter();
  };

  componentDidMount() {
    const auth = sessionStorage.getItem("barterAuth");
    if (auth !== null) {
      fetch(`https://hunterbarter.herokuapp.com/user`, {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      })
        .then(response => response.json())
        .then(user => {
          this.setState({ user: user });
          sessionStorage.setItem("user", user.username);
        });
    }
  }
  rerender = () => {
    console.log("called");
    this.setState({
      renderList: this.state.renderList
    });
  };
  signOut = () => {
    this.setState({
      state: this.state
    });
  };
  toggleProfile = () => {
    this.setState({
      showProfile: !this.state.showProfile
    });
  };
  toggleAddItemModal = () => {
    this.setState({
      addItemModal: !this.state.addItemModal
    });
  };
  renderWishList = () => {
    this.setState({
      renderList: "WishList",
      currpage: "WishList"
    });
  };
  renderMyList = () => {
    this.setState({
      renderList: "List",
      currpage: "List"
    });
  };
  renderAllItems = () => {
    this.setState({
      renderList: "Items",
      currpage: "Items"
    });
  };
  renderFilter = () => {
    this.setState({
      renderList: "Filter"
    });
  };
  renderSearch = item => {
    this.setState({
      renderList: "Search",
      item: item
    });
  };

  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    });
  };
  prevPage = () => {
    this.setState({
      page: this.state.page - 1
    });
  };
  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="Home">
        <Navigation signOut={this.signOut} toggleProfile={this.toggleProfile} />
        <img src={logo} width="20%" alt="hunter" />
        <h1 id="banner">Hunter Barter App</h1>

        <Modal open={this.state.addItemModal} onClose={this.toggleAddItemModal}>
          <DialogContent>
            <AddItem close={this.toggleAddItemModal} />
          </DialogContent>
        </Modal>
        <Modal open={this.state.showProfile} onClose={this.toggleProfile}>
          <DialogContent>
            <Profile close={this.toggleProfile} user={this.state.user} />
          </DialogContent>
        </Modal>
        <div className="buttonGroup">
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.toggleAddItemModal}
          >
            Add Item
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderAllItems}
          >
            All Items
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderMyList}
          >
            My Items
          </Button>
          <div className="divider" />
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.renderWishList}
          >
            Wishlist
          </Button>
          <br />
          <TextField
            select
            label="Condition"
            value={this.state.condition}
            onChange={this.handleChange("condition")}
            SelectProps={{}}
            helperText="Filter by condition"
            margin="normal"
            variant="outlined"
          >
            {conditions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Category"
            value={this.state.category}
            onChange={this.handleChange("category")}
            SelectProps={{}}
            helperText="Filter by category"
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
          {/* <FilterItem onChange ="alert(30);" /> */}
        </div>
        <SearchBar search={this.renderSearch} />

        <ItemList
          renderList={this.state.renderList}
          rerender={this.rerender}
          page={this.state.page}
          condition={this.state.condition}
          category={this.state.category}
          currpage={this.state.currpage}
          name={this.state.item}
        />
        {this.state.page > 1 ? (
          <div>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.prevPage}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              size="large"
              color="primary"
              onClick={this.nextPage}
            >
              next
            </Button>
          </div>
        ) : (
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={this.nextPage}
          >
            next
          </Button>
        )}

        <br />
      </div>
    );
  }
}

export default Home;
