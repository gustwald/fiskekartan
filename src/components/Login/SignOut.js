import React, { Component } from "react";
import GoogleSignup from "./GoogleSignup.js";
import { initFirebase, signOutUser } from "../../utils/Firebase.js";
import { Button } from "antd";
import firebase from "firebase";
import "../../App.css";

class SignOut extends Component {
  signOut = () => {
    signOutUser(this.onSuccess, this.onFailure);
  };

  onSuccess = result => {
    this.props.onLogout();
  };

  onFailure = error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log({ errorCode, errorMessage, email, credential });
  };

  render() {
    return (
      <div className="signOut">
        <Button className="signOut" onClick={this.signOut}>
          Logga ut
        </Button>
      </div>
    );
  }
}

export default SignOut;
