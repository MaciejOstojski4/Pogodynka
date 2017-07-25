import { default as React, Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { connect } from "react-redux";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{
        lat: props.markers[0].coord.lat,
        lng: props.markers[0].coord.lon
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
              onClick={() => props.onClick(marker)}
            >
              {marker.showInfo &&
                <InfoWindow onCloseClick={() => props.onClose(marker)}>
                  <div>
                    <p>
                      <b>
                        {marker.name}
                      </b>
                    </p>
                    <p>
                      Temperature: {marker.main.temp} C
                    </p>
                    <p>
                      Humidity: {marker.main.humidity} %
                    </p>
                    <p>
                      Pressure: {marker.main.pressure} hPa
                    </p>
                  </div>
                </InfoWindow>}
            </Marker>
          );
        })}
      </MarkerClusterer>
    </GoogleMap>
  );
});
class MarkerClustererExample extends Component {
  // Toggle to 'true' to show InfoWindow and re-renders component
  constructor(props) {
    super(props);
    this.state = {
      mark: this.props.data
    };
  }
  markerClick = marker => {
    const temp = this.state.mark;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = true;
      }
      this.setState({
        mark: temp
      });
    });
  };
  popUpHide = marker => {
    const temp = this.state.mark;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = false;
      }
      this.setState({
        mark: temp
      });
    });
  };

  render() {
    const markers = this.props.data;
    console.log(this.props.data);
    return (
      <MarkerClustererExampleGoogleMap
        containerElement={<div style={{ height: `600px` }} />}
        mapElement={<div style={{ height: `600px` }} />}
        markers={this.state.mark}
        onClick={this.markerClick}
        onClose={this.popUpHide}
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
