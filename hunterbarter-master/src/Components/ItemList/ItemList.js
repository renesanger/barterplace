import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Button } from "@material-ui/core";
import ItemCard from "./ItemCard/ItemCard";
import "./ItemList.css";
import FilterItem from "../FilterItem/FilterItem";
var newResponse = [];
var favorites = [];
var page = 1;
class AddItem extends Component {
  constructor(props) {
    super();
    this.state = { items: [] };
  }

  componentWillReceiveProps(nextProps) {
    let render = "list";
    let renderWishList = false;
    if (nextProps.renderList === "Items") {
      renderWishList = false;
      render = "list";
    } else if (nextProps.renderList === "List") {
      renderWishList = false;
      render = "list/user";
    } else if (nextProps.renderList === "WishList") {
      renderWishList = true;
      render = "list";
    } else if (nextProps.renderList === "Filter") {
      renderWishList = false;
      render = "filter";
    } else if (nextProps.renderList === "Search") {
      renderWishList = false;
      render = "search";
    }

    const auth = sessionStorage.getItem("barterAuth");
    if (auth) {
      this.setState({
        isAuthenticated: true
      });
    }

    var url = `https://hunterbarter.herokuapp.com/${render}/${nextProps.page}`;
    if (nextProps.renderList === "Filter") {
      url = `https://hunterbarter.herokuapp.com/${render}/${
        nextProps.currpage
      }/${nextProps.page}?condition=${nextProps.condition}&category=${
        nextProps.category
      }`;
    } else if (nextProps.renderList === "Search") {
      url = `https://hunterbarter.herokuapp.com/${render}?query=${
        nextProps.name
      }`;
    }

    fetch(url, {
      credentials: "same-origin",
      method: "get",
      headers: { "Content-Type": "application/json", Authorization: auth }
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);

        newResponse = response.map(item => {
          console.log(item);

          let date = new Date(item.dateAdded.$date);
          date = date.toLocaleDateString();
          return {
            name: item.item,
            description: item.description,
            username: item.username,
            date: date,
            image: "dkdno63yk5s4u.cloudfront.net/" + item.picture,
            category: item.category,
            condition: item.condition,
            id: item._id.$oid
          };
        });
      })
      .then(res => {
        fetch(`https://hunterbarter.herokuapp.com/favorite`, {
          credentials: "same-origin",
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth
          }
        })
          .then(response => response.json())
          .then(wishlist => {
            favorites = wishlist;
            if (wishlist.length && renderWishList) {
              let temp = newResponse.filter(value =>
                wishlist.includes(value.id)
              );
              this.setState({ items: temp });
            } else {
              this.setState({ items: newResponse });
            }
          });
      });

    this.setState({ state: this.state });
  }

  render() {
    if (!sessionStorage.getItem("barterAuth")) return <Redirect to="/Login" />;
    return (
      <div className="ItemList">
        <div className="List">
          {this.state.items.length > 0 ? (
            this.state.items.map((item, index) => (
              <div key={index} className="itemCard">
                <ItemCard
                  item={item}
                  rerender={this.props.rerender}
                  wishlist={favorites}
                />
              </div>
            ))
          ) : (
            <h1>Your {this.props.renderList} could be here...</h1>
          )}
        </div>
      </div>
    );
  }
}

export default AddItem;
