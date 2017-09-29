import React, { Component } from "react";
import { initFirebase, googleLogin } from "../../utils/Firebase.js";
import { Button, Icon } from "antd";
import CurrentUser from "../CurrentUser.js";
import "../../App.css";

class GoogleSignup extends Component {
  signIn = () => {
    googleLogin(this.onSuccess, this.onFailure);
  };

  onSuccess = result => {
    var token = result.credential.accessToken;
    var user = result.user;
    this.props.onLogin(user.displayName, user.photoURL);
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
      <div className="login">
        <Button className="signIn" onClick={this.signIn}>
          Logga in med Google
        </Button>
      </div>
    );
  }
}

export default GoogleSignup;
