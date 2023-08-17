import React from "react";
import { Button } from "@material-ui/core";

const Navigation = ({ signOut, toggleProfile }) => {
  return (
    <nav
      style={{ display: "flex", justifyContent: "flex-end", margin: "10px" }}
    >
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={() => {
          signOut();
          sessionStorage.clear();
        }}
      >
        Sign Out
      </Button>
      <Button
        variant="contained"
        size="large"
        color="secondary"
        onClick={() => {
          toggleProfile();
        }}
        style={{ marginLeft: "10px" }}
      >
        Profile
      </Button>
    </nav>
  );
};

export default Navigation;
