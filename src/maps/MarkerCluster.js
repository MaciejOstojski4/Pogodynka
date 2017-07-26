import React, { Component } from "react";

class MarkerClusterer extends Component {
  render() {
    return;
    <div>
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
    </div>;
  }
}

export default MarkerClusterer;
