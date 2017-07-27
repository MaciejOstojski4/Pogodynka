import React, { Component } from "react";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";
import { Marker, InfoWindow } from "react-google-maps";

class MarkerClustererComponent extends Component {
  render() {
    return (
      <div>
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
          {props.markers.map(marker =>
            <Marker
              position={{
                lat: props.marker.city.coord.lat,
                lng: props.marker.city.coord.lon
              }}
              icon={{
                url: `http://openweathermap.org/img/w/${props.marker.list[0]
                  .weather[0].icon}.png`
              }}
              key={props.marker.city.id}
              onClick={() => props.onMarkerClick(props.marker)}
            >
              {props.marker.showInfo &&
                <InfoWindow onCloseClick={() => props.onClose(props.marker)}>
                  <div
                    onClick={() =>
                      props.onInfoWindowClick(props.marker.city.name)}
                  >
                    <p>
                      <b>
                        {props.marker.city.name}
                      </b>
                    </p>
                    <p>
                      Temperature: {props.marker.list[0].main.temp} C
                    </p>
                    <p>
                      Humidity: {props.marker.list[0].main.humidity} %
                    </p>
                    <p>
                      Pressure: {props.marker.list[0].main.pressure} hPa
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
