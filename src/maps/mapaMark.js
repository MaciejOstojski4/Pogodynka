import fetch from "isomorphic-fetch";
import { default as React, Component } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { connect } from "react-redux";

const MarkerClustererExampleGoogleMap = withGoogleMap(props =>
  <GoogleMap
    defaultZoom={4}
    defaultCenter={{
      lat: 55,
      lng: 10
    }}
  >
    <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
      {props.markers.map(marker => {
        return (
          <Marker
            position={{
              lat: marker.coord.lat,
              lng: marker.coord.lon
            }}
            key={marker.sys.id}
          />
        );
      })}
    </MarkerClusterer>
  </GoogleMap>
);
class MarkerClustererExample extends Component {
  render() {
    const markers = this.props.data[0];

    return (
      <MarkerClustererExampleGoogleMap
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `600px` }} />}
        markers={markers}
      />
    );
  }
}
const mapStateToProps = currentState => {
  return {
    data: currentState.weather.savedWeather
  };
};

export default connect(mapStateToProps)(MarkerClustererExample);
