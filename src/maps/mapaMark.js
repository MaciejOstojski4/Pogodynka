import fetch from "isomorphic-fetch";
import { default as React, Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { connect } from "react-redux";
import {
  showMapPopUpAction,
  hideMapPopUpAction
} from "../actions/weather-actions";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => {
  return (
    <GoogleMap
      defaultZoom={4}
      defaultCenter={{
        lat: props.markers[0].coord.lat,
        lng: props.markers[0].coord.lon
      }}>
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
        {props.markers.map(marker => {
          {
            /* przerzucilbym to jako komponent */
          }
          return (
            <Marker
              position={{
                lat: marker.coord.lat,
                lng: marker.coord.lon
              }}
              key={marker.sys.id}
              onClick={() => props.onClick(marker)}>
              {marker.showInfo &&
                <InfoWindow onCloseClick={() => props.onClose(marker)}>
                  <div>
                    <p>{marker.name}</p>
                    <p>Temperature: {marker.main.temp} C</p>
                    Humidity: {marker.main.humidity} %
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
  // zbedny komentarz
  // Toggle to 'true' to show InfoWindow and re-renders component

  markerClick = marker => {
    // slaba nazwa 'temp'
    const temp = this.props.data;
    // absolutnie nie mozna tego zrobic w ten sposob
    // domyslam sie ze to jest miejsce w ktorym "nie dziala bez przeladowania"?
    temp.map(p => {
      if (p === marker) {
        p.showInfo = true;
        // nie wiem czy dispatch jest tu potrzebny
        this.props.dispatch(showMapPopUpAction(temp));
      }
    });
  };
  popUpHide = marker => {
    // slaba nazwa 'temp'
    const temp = this.props.data;
    // absolutnie nie mozna tego zrobic w ten sposob
    // domyslam sie ze to jest miejsce w ktorym "nie dziala bez przeladowania"?
    temp.map(p => {
      if (p === marker) {
        p.showInfo = false;
        // nie wiem czy dispatch jest tu potrzebny
        this.props.dispatch(hideMapPopUpAction(temp));
      }
    });
  };
  render() {
    const markers = this.props.data;
    // console.log
    console.log(markers);
    return (
      <MarkerClustererExampleGoogleMap
        {/* nie trzeba tutaj uzywac ``, masz zwykly string */}
        containerElement={<div style={{ height: `600px` }} />}
        {/* nie trzeba tutaj uzywac ``, masz zwykly string */}
        mapElement={<div style={{ height: `600px` }} />}
        markers={markers}
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
