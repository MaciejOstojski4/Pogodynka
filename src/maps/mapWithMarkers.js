import React, { Component } from "react";
import { withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerClustererComponent from "./MarkerClustererComponent";

const MapWithMarkerClusterer = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{
        lat: props.markers[0].coord.lat,
        lng: props.markers[0].coord.lon
      }}
    >
      <MarkerClustererComponent
        markers={props.markers}
        onMarkerClick={props.onMarkerClick}
        onClose={props.onClose}
        onInfoWindowClick={props.onInfoWindowClick}
      />
    </GoogleMap>
  );
});
class MapWithMarkers extends Component {
  render() {
    return (
      <MapWithMarkerClusterer
        containerElement={<div style={{ height: "600px" }} />}
        mapElement={<div style={{ height: "600px" }} />}
        markers={this.props.markers}
        onMarkerClick={this.props.markerClick}
        onClose={this.props.popUpHide}
        onInfoWindowClick={this.props.onInfoWindowClick}
      />
    );
  }
}

export default MapWithMarkers;
