import React, { Component } from "react";
import GoogleSignup from "./GoogleSignup.js";
import CurrentUser from "../CurrentUser.js";
import {
  initFirebase,
  googleLogin,
  loginWithEmailAndPassword
} from "../../utils/Firebase.js";
import { Button, Input, Icon } from "antd";
import firebase from "firebase";
import RegisterWithEmail from "./RegisterWithEmail.js";
import "../../App.css";

class LoginWithEmail extends Component {
  state = {
    username: "",
    password: "",
    user: "",
    error: ""
  };

  signIn = result => {
    loginWithEmailAndPassword(this.onSuccess, this.onFailure, this.state);
  };
  onSuccess = result => {
    this.props.onLogin(
      result.email,
      "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg"
    );
  };

  onFailure = error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    this.setState({ error: errorMessage });
    console.log({ errorCode, errorMessage, email, credential });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <div>
        <form>
          <div className="form-group">
            <Input
              placeholder="Email"
              prefix={<Icon type="user" />}
              type="text"
              name="username"
              className="modalInput"
              value={this.state.username}
              onChange={this.onChange}
            />
            <Input
              placeholder="Lösenord"
              prefix={<Icon type="lock" />}
              type="password"
              name="password"
              className="modalInput"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <Button onClick={this.signIn}>Logga in</Button>
          <p className="errorMessage">{this.state.error}</p>
        </form>
      </div>
    );
  }
}

export default LoginWithEmail;
