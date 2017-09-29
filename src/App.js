import React, { Component } from "react";
import GoogleSignup from "./components/Login/GoogleSignup.js";
import LoginModal from "./components/Login/LoginModal.js";
import IntroText from "./components/IntroText.js";
import CurrentUser from "./components/CurrentUser.js";
import Logo from "./components/Logo.js";
import SignOut from "./components/Login/SignOut.js";
import { initFirebase, googleLogin } from "./utils/Firebase.js";
import Map from "./components/FishMap/Map.js";
import MapBox from "./components/FishMap/MapBox.js";
import "./App.css";

class App extends Component {
  state = {
    currentUser: "",
    photoUrl: "",
    loggedIn: false,
    showLogin: true,
    showLogout: false,
    mapId: "mapid"
  };
  componentWillMount() {
    initFirebase();
  }

  render() {
    return (
      <div className="App">
        <Logo />
        <IntroText text="Välkommen till fiskekartan, logga in för att lägga till fisk" />
        
        <Map idd={this.state.mapId} />
      </div>
    );
  }
}

export default App;
