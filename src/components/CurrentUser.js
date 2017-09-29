import React, { Component } from "react";
import GoogleSignup from "./Login/GoogleSignup.js";
import "../App.css";

function CurrentUser(props) {
  return (
    <div>
      <p className="displayName">inloggad som: {props.displayName}</p>
      <img className="userPhoto" src={props.photoURL} />
    </div>
  );
}

export default CurrentUser;
