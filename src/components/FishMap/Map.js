import React, { Component } from "react";
import { Checkbox } from "semantic-ui-react";
import firebase from "firebase";
import Leaflet from "leaflet";
import MapBox from "./MapBox.js";
import { Form, Icon, Input, Button, Select, Spin } from "antd";
import CurrentUser from "../CurrentUser.js";
import LoginModal from "../Login/LoginModal.js";
import SignOut from "../Login/SignOut.js";
import "../../App.css";

const Option = Select.Option;

class Map extends Component {
  state = {
    selectedSpecies: "",
    weight: "",
    length: "",
    latitude: "",
    longitude: "",
    userid: "",
    loading: false,
    currentUser: "",
    photoUrl: "",
    loggedIn: false,
    showLogin: true,
    showLogout: false,
    mapId: "",
    mustBeLoggedIn: "",
    help: "",
    validation: ""
  };

  getCurrentPosition = e => {
    this.setState({
      loading: true
    });
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position.coords.latitude);
      this.setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        loading: false
      });
    });
  };
  handleChange = value => {
    this.setState({ selectedSpecies: value });
  };

  uploadFish = (e, value) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;
    const db = firebase.database();
    const target = e.target;
    const d = new Date().toDateString();

    if (
      target.weight.value &&
      target.length.value &&
      target.latitude.value &&
      target.longitude.value
    ) {
      this.setState({
        help: "Fisk tillagd!",
        validation: "success"
      });
      const fishObj = {
        userId: user.uid,
        species: this.state.selectedSpecies,
        weight: target.weight.value,
        length: target.length.value,
        coordinates: {
          latitude: target.latitude.value,
          longitude: target.longitude.value
        },
        date: d
      };

      db.ref("fish").push(fishObj);
    } else {
      this.setState({
        help: "Alla fält måste vara ifyllda",
        validation: "error"
      });
    }
  };

  getCoords = coords => {
    console.log(coords);
    this.setState({
      latitude: coords.lat,
      longitude: coords.lng
    });
  };

  onLogin = (displayName, photoURL) => {
    this.setState({
      currentUser: displayName,
      photoUrl: photoURL,
      loggedIn: true,
      showLogin: false
    });
  };
  onLogout = () => {
    this.setState({ loggedIn: false, currentUser: "", photoURL: "" });
  };
  slideOut = () => {
    this.setstate({
      mapId: "mapid",
      visible: "btn-addFish-visible"
    });
  };

  render() {
    return (
      <div className="caughtFish">
        <div className="formContainer">
          {this.state.loggedIn && (
            <CurrentUser
              photoURL={this.state.photoUrl}
              displayName={this.state.currentUser}
            />
          )}
          {this.state.loggedIn && <SignOut onLogout={this.onLogout} />}
          {!this.state.loggedIn && <LoginModal onLogin={this.onLogin} />}

          <Form className="caughtFishForm" onSubmit={this.uploadFish}>
            <p className="formHeader">Lägg till fisk</p>
            <Form.Item>
              <Select
                name="species"
                defaultValue="Fisk"
                onChange={this.handleChange}
              >
                <Option value="Abborre">Abborre</Option>
                <Option value="Lax">Lax</Option>
                <Option value="Gädda">Gädda</Option>
                <Option value="Gös">Gös</Option>
                <Option value="Ål">Ål</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <label>Vikt (kg):</label>
              <Input type="number" name="weight" />
            </Form.Item>
            <Form.Item>
              <label>Längd (cm):</label>
              <Input type="number" name="length" />
            </Form.Item>
            <Form.Item>
              <label>Latitude: (klicka på kartan)</label>
              <Input type="text" name="latitude" value={this.state.latitude} />
            </Form.Item>
            <Form.Item>
              <label>Longitude: (klicka på kartan)</label>
              <Input
                type="text"
                name="longitude"
                value={this.state.longitude}
              />
            </Form.Item>
            <Form.Item>
              <Button
                loading={this.state.loading}
                onClick={this.getCurrentPosition}
              >
                Nuvarande plats
              </Button>
            </Form.Item>
            <Form.Item
              help={this.state.help}
              validateStatus={this.state.validation}
            >
              <Button htmlType="submit">Lägg till fisk</Button>
              <p className="errorMessage">{this.state.mustBeLoggedIn}</p>
            </Form.Item>
          </Form>
        </div>
        <MapBox
          getCoordsFromMap={this.getCoords}
          slideOut={this.props.slideOut}
          lat={59.32487007677034}
          long={18.07062149047852}
        />
      </div>
    );
  }
}

export default Map;
