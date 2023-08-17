import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "@material-ui/core/Modal";
import DialogContent from "@material-ui/core/DialogContent";

import EditItem from "./EditItem";
const styles = theme => ({
  card: {
    maxWidth: "350px",
    minWidth: "350px",
    minHeight: "450px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  favoriteIcon: {
    color: red[500]
  },
  shareIcon: {
    color: blue[500]
  }
});

class ItemCard extends React.Component {
  constructor(props) {
    super();
    this.state = {
      expanded: false,
      anchorEl: null,
      editItemModel: false,
      contactModal: false,
      userEmail: "",
      userPhone: "",
      wishlist: []
    };
  }

  componentDidMount() {
    if (this.props.wishlist.error === undefined) {
      this.setState({
        wishlist: this.props.wishlist
      });
    }
  }
  handleExpandClick = () => {
    console.log(this.props.item);
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  deleteItem = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/list/remove/${this.props.item.id}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    ).then(res => this.props.rerender());
  };
  toggleEditItemModel = () => {
    this.setState({
      editItemModel: !this.state.editItemModel
    });
  };
  toggleContactModel = res => {
    this.setState({
      contactModal: !this.state.contactModal,
      userEmail: res.username,
      userPhone: res.phone
    });
  };
  contactUser = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/user/${this.props.item.username}`,
      {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    )
      .then(response => response.json())
      .then(res => this.toggleContactModel(res));
  };
  addToWishlist = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/favorite/set/${this.props.item.id}`,
      {
        credentials: "same-origin",
        method: "post",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    )
      .then(response => response.json())
      .then(res => this.setState({ state: this.state }));
    this.setState({ wishlist: [...this.state.wishlist, this.props.item.id] });
  };
  removeFromWishlist = () => {
    const auth = sessionStorage.getItem("barterAuth");
    fetch(
      `https://hunterbarter.herokuapp.com/favorite/delete/${
        this.props.item.id
      }`,
      {
        credentials: "same-origin",
        method: "get",
        headers: { "Content-Type": "application/json", Authorization: auth }
      }
    ).then(res => this.props.rerender());
    let newWishList = this.state.wishlist;
    newWishList.splice(newWishList.indexOf(this.props.item.id, 1));
    this.setState({
      wishlist: newWishList
    });
  };

  render() {
    const { classes } = this.props;
    const open = Boolean(this.state.anchorEl);
    return (
      <div>
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Profile" className={classes.avatar}>
                {this.props.item.username[0].toUpperCase()}
              </Avatar>
            }
            action={
              <div>
                <IconButton onClick={this.handleClick}>
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={this.state.anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: 48 * 4.5,
                      width: 200
                    }
                  }}
                >
                  {sessionStorage.getItem("user") ===
                  this.props.item.username ? (
                    <div>
                      <MenuItem key={"edit"} onClick={this.toggleEditItemModel}>
                        Edit
                      </MenuItem>
                      <MenuItem key={"delete"} onClick={this.deleteItem}>
                        Delete
                      </MenuItem>
                    </div>
                  ) : (
                    <div>
                      <MenuItem key={"contact"} onClick={this.contactUser}>
                        Contact
                      </MenuItem>
                    </div>
                  )}
                  ))}
                </Menu>
              </div>
            }
            title={this.props.item.name}
            subheader={this.props.item.date}
          />
          <CardMedia
            className={classes.media}
            image={"https://" + this.props.item.image}
            title={this.props.item.name}
          />

          <CardContent>
            <Typography component="h3">
              Condtion: {this.props.item.condition}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {this.state.wishlist.includes(this.props.item.id) ? (
              <IconButton
                aria-label="Add to favorites"
                /*
               check if already in wishlist, call add/remove
                */
                onClick={this.removeFromWishlist}
              >
                <FavoriteIcon className={classes.favoriteIcon} />
              </IconButton>
            ) : (
              <IconButton
                aria-label="Add to favorites"
                /*
                 check if already in wishlist, call add/remove
                  */
                onClick={this.addToWishlist}
              >
                <FavoriteIcon className={"none"} />
              </IconButton>
            )}

            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>Description:</Typography>
              <Typography paragraph>{this.props.item.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
        <Modal
          open={this.state.editItemModel}
          onClose={this.toggleEditItemModel}
        >
          <DialogContent>
            <EditItem
              close={this.toggleEditItemModel}
              itemID={this.props.item.id}
            />
          </DialogContent>
        </Modal>
        <Modal open={this.state.contactModal} onClose={this.toggleContactModel}>
          <DialogContent>
            <div className="contactModal">
              <p>{this.state.userEmail}</p>
              <h2>{this.state.userPhone}</h2>
            </div>
          </DialogContent>
        </Modal>
      </div>
    );
  }
}

ItemCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ItemCard);
