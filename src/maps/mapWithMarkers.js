import { default as React, Component } from "react";
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
        onClick={props.onClick}
        onClose={props.onClose}
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
        onClick={this.props.markerClick}
        onClose={this.props.popUpHide}
      />
    );
  }
}

export default MapWithMarkers;
