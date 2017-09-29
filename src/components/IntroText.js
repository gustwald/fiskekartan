import React, { Component } from "react";
import "../App.css";

function IntroText(props) {
  return (
    <div className="introTextContainer">
      <h1 className="introText">{props.text}</h1>
    </div>
  );
}

export default IntroText;
