import React, { Component } from "react";
import firebase from "firebase";
import { Button, Input, Icon } from "antd";
import {
  initFirebase,
  googleLogin,
  loginWithEmailAndPassword,
  registerUser
} from "../../utils/Firebase.js";
import "../../App.css";

class RegisterWithEmail extends Component {
  state = {
    username: "",
    password: "",
    name: "",
    user: "",
    message: "",
    error: ""
  };

  register = result => {
    registerUser(this.onSuccess, this.onFailure, this.state);
  };

  onSuccess = result => {
    // console.log(firebase.databse.ref('users'));
    // firebase.database().ref("users").child(result.uid).set({displayName: this.state.name})
    this.setState({
      message: `Välkommen ${result.email}, du kan nu logga in!`
    });
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
      <div className="registerWithEmail">
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <Input
              className="modalInput"
              placeholder="Email"
              prefix={<Icon type="user" />}
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />

            <Input
              className="modalInput"
              placeholder="Lösenord"
              prefix={<Icon type="lock" />}
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <Button
            type="submit"
            value="Register"
            onClick={this.register}
            className=""
          >
            Registrera
          </Button>
        </form>
        <p>{this.state.message}</p>
        <p className="errorMessage">{this.state.error}</p>
      </div>
    );
  }
}

export default RegisterWithEmail;
