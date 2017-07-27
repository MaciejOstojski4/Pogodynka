import React, { Component } from "react";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { Marker, InfoWindow } from "react-google-maps";

class MarkerClustererComponent extends Component {
  render() {
    return (
      <div>
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
          <Marker
            position={{
              lat: this.props.markers.city.coord.lat,
              lng: this.props.markers.city.coord.lon
            }}
            icon={{
              url: `http://openweathermap.org/img/w/${this.props.markers.list[0]
                .weather[0].icon}.png`
            }}
            key={this.props.markers.city.id}
            onClick={() => this.props.onMarkerClick(this.props.markers)}
          >
            {this.props.markers.showInfo &&
              <InfoWindow
                onCloseClick={() => this.props.onClose(this.props.markers)}
              >
                <div
                  onClick={() =>
                    this.props.onInfoWindowClick(this.props.markers.city.name)}
                >
                  <p>
                    <b>
                      {this.props.markers.city.name}
                    </b>
                  </p>
                  <p>
                    Temperature: {this.props.markers.list[0].main.temp} C
                  </p>
                  <p>
                    Humidity: {this.props.markers.list[0].main.humidity} %
                  </p>
                  <p>
                    Pressure: {this.props.markers.list[0].main.pressure} hPa
                  </p>
                </div>
              </InfoWindow>}
          </Marker>
          }
        </MarkerClusterer>
      </div>
    );
  }
}

export default MarkerClustererComponent;
