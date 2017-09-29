import React, { Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import Leaflet from "leaflet";
import { Button, Icon } from "antd";
import firebase from "firebase";
import Icons from "./Icons.js";
import FilterFish from "../FilterFish.js";
import fishNames from "../../constants/fishNames.js";
import urlsAndTokens from "../../constants/urlsAndTokens.js";
import Map from "./Map.js";
import "../../App.css";

class MapBox extends Component {
  state = {
    map: "",
    marker: "",
    mapId: "mapid",
    visible: "btn-addFish-visible",
    fishArray: [],
    selectedTypes: [
      fishNames.pike,
      fishNames.eel,
      fishNames.zander,
      fishNames.salmon,
      fishNames.perch
    ]
  };

  layers = [];

  componentDidMount() {
    const db = firebase.database();
    const fishArray = [];

    this.mymap = Leaflet.map("mapid", {
      zoomControl: false
    });

    this.mymap.setView([59.334591, 18.06324], 13);
    Leaflet.tileLayer(urlsAndTokens.leafletUrl, {
      attribution: "",
      maxZoom: 16,
      id: "mapbox.streets",
      accessToken: urlsAndTokens.leafletToken
    }).addTo(this.mymap);

    this.setState({
      map: this.mymap
    });

    this.mymap.on("click", this.onMapClick);

    db
      .ref("fish")
      .orderByChild("date")
      .on("value", snapshot => {
        for (var prop in snapshot.val()) {
          fishArray.push(snapshot.val()[prop]);
        }
        this.setState({ fishArray: fishArray }, () => this.showFishesOnMap());
      });
  }

  onMapClick = e => {
    const coords = e.latlng;
    if (this.state.marker != "") {
      this.mymap.removeLayer(this.state.marker);
    }
    const fishMarker = Leaflet.marker([coords.lat, coords.lng]).addTo(
      this.state.map
    );
    this.setState({
      marker: fishMarker
    });
    this.props.getCoordsFromMap(coords);
  };

  showFishesOnMap = () => {
    var filteredFish = this.state.fishArray.filter(fish =>
      this.state.selectedTypes.includes(fish.species)
    );

    this.layers.forEach(layer => {
      this.mymap.removeLayer(layer);
    });
    filteredFish.forEach(item => {
      var customIcon = this.getIcon(item.species);
      var fishGroup = Leaflet.layerGroup()
        .addLayer(
          Leaflet.marker(
            [item.coordinates.latitude, item.coordinates.longitude],
            { icon: customIcon }
          ).bindPopup(
            `<b>${item.species}</b><br>${item.weight}kg<br>${item.length}cm<br>${item.date}`
          )
        )
        .addTo(this.mymap);
      this.layers.push(fishGroup);
    });
  };

  filterFishSpecies = fishType => {
    const includes = this.state.selectedTypes.includes(fishType);
    const selectedTypes = includes
      ? this.state.selectedTypes.filter(fish => fish !== fishType)
      : [...this.state.selectedTypes, fishType];

    this.setState(
      {
        selectedTypes
      },
      () => {
        this.showFishesOnMap();
      }
    );
  };

  addId = () => {
    this.setState({
      mapId: "newmapid",
      visible: "btn-addFish-hidden"
    });
  };

  removeId = () => {
    this.setState({
      mapId: "newmapid2",
      visible: "btn-addFish-visible"
    });
  };

  getIcon(selectedFish) {
    switch (selectedFish) {
      case fishNames.pike:
        return Leaflet.icon({
          iconUrl: urlsAndTokens.pikeIcon,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
        });
      case fishNames.perch:
        return Leaflet.icon({
          iconUrl: urlsAndTokens.perchIcon,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
        });
      case fishNames.salmon:
        return Leaflet.icon({
          iconUrl: urlsAndTokens.salmonIcon,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
        });
      case fishNames.zander:
        return Leaflet.icon({
          iconUrl: urlsAndTokens.zanderIcon,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
        });
      case fishNames.eel:
        return Leaflet.icon({
          iconUrl: urlsAndTokens.eelIcon,
          iconSize: [48, 48], // size of the icon
          iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
          popupAnchor: [0, -8] // point from which the popup should open relative to the iconAnchor
        });
    }
  }

  render() {
    return (
      <div className="mapBox">
        <FilterFish
          selected={this.state.selectedTypes}
          onChange={this.filterFishSpecies}
        />

        <div id={this.state.mapId} />
        <Icon
          type="close"
          className="slideOut"
          onClick={this.removeId}
          style={{ fontSize: 25 }}
        />
        <Button
          shape="circle"
          size="large"
          icon="right"
          className={this.state.visible}
          onClick={this.addId}
        />
      </div>
    );
  }
}

export default MapBox;
