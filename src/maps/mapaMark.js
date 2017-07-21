import fetch from "isomorphic-fetch";
import { default as React, Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { connect } from "react-redux";

const MarkerClustererExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
      {props.markers.map(marker =>
        <Marker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          key={marker.photo_id}
        />
      )}
    </MarkerClusterer>
  </GoogleMap>
);

export default class MarkerClustererExample extends Component {
  state = {
    markers: [{ latitude: 51.51, longitude: -0.13 }]
  };

  render() {
    console.lo;
    return (
      <MarkerClustererExampleGoogleMap
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `600px` }} />}
        markers={this.state.markers}
      />
    );
  }
}
