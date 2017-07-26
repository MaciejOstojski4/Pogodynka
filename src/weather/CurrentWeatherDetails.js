import React from "react";
import styled from "styled-components";

class CurrentWeatherDetails extends React.Component {

  getStarIcon = () => {
    if(this.props.liked) {
      return "glyphicon glyphicon-star";
    }
    return "glyphicon glyphicon-star-empty";
  }

  changeFavStatusOnServer = e => {
    e.preventDefault();
    this.props.onLikeClick(!this.props.liked);
  }

  render() {
    return (
      <div>
        <InfoContainer>
          <TitleRow>
            <span onClick={this.changeFavStatusOnServer} className={this.getStarIcon()} /> {this.props.cityName}
          </TitleRow>
          <InfoRow>
            <div className="text-left">Temperature:</div>
            <div className="text-right">
              {this.props.city.main.temp} &deg;C
            </div>
          </InfoRow>
          <InfoRow>
            <div className="text-left">Pressure:</div>
            <div className="text-right">
              {this.props.city.main.pressure} hPa
            </div>
          </InfoRow>
          <InfoRow>
            <div className="text-left">Wind:</div>
            <div className="text-right">
              {this.props.city.wind.speed} km/h
            </div>
          </InfoRow>
          <InfoRow>
            <div className="text-left">Humidity:</div>
            <div className="text-right">
              {this.props.city.main.humidity} %
            </div>
          </InfoRow>
          <InfoRow>
            <div className="text-left">Cloudiness:</div>
            <div className="text-right">
              {this.props.city.clouds.all} %
            </div>
          </InfoRow>
        </InfoContainer>
      </div>
    );
  }
}

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  padding-right: 0px;
  font-size: 160%;
`;

const TitleRow = styled.div`
  flex: 1;
  font-size: 170%;
  font-weight: bold;
  text-align: center;
`;

const InfoRow = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 15px;
`;

export default CurrentWeatherDetails;
