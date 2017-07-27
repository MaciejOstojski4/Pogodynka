import React, { Component } from "react";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { Marker, InfoWindow } from "react-google-maps";

class MarkerClustererComponent extends Component {
  render() {
    console.log(this.props.markers);
    return (
      <div>
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
          {this.props.markers.map(marker =>
            <Marker
              position={{
                lat: marker.coord.lat,
                lng: marker.coord.lon
              }}
              icon={{
                url: `http://openweathermap.org/img/w/${marker.weather[0]
                  .icon}.png`
              }}
              key={marker.id}
              onClick={() => this.props.onMarkerClick(marker)}
            >
              {marker.showInfo &&
                <InfoWindow onCloseClick={() => this.props.onClose(marker)}>
                  <div
                    onClick={() => this.props.onInfoWindowClick(marker.name)}
                  >
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
          )}
        </MarkerClusterer>
      </div>
    );
  }
}

export default MarkerClustererComponent;
