/**
 * Created by react on 17.07.17.
 */
import React from "react";
import styled from "styled-components";

class CurrentWeatherDetails extends React.Component {
  render() {
    return (
      <div className="text-center">
        <TileField>
          <h2>
            <b>
              {this.props.cityName}
            </b>
          </h2>
        </TileField>
        <TileField>
          <div className="col-md-6 text-left" >
            Temperature:
          </div>
          <div className="col-md-6 text-right" >
            {this.props.city.main.temp} &deg;C
          </div>
        </TileField>
        <TileField>
          <div className="col-md-6 text-left" >
            Pressure::
          </div>
          <div className="col-md-6 text-right" >
            {this.props.city.main.pressure} hPa
          </div>
        </TileField>
        <TileField>
          <div className="col-md-6 text-left" >
            Wind:
          </div>
          <div className="col-md-6 text-right" >
            {this.props.city.wind.speed} km/h
          </div>
        </TileField>
        <TileField>
          <div className="col-md-6 text-left" >
            Humidity:
          </div>
          <div className="col-md-6 text-right" >
            {this.props.city.main.humidity} %
          </div>
        </TileField>
        <TileField>
          <div className="col-md-6 text-left" >
            Cloudiness:
          </div>
          <div className="col-md-6 text-right" >
            {this.props.city.clouds.all} %
          </div>
        </TileField>
      </div>
    );
  }
}

const TileField = styled.div`
  color: #1b5e20;
  font-size: 150%;
`;

export default CurrentWeatherDetails;
