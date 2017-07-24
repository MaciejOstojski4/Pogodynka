import React from "react";
import styled from "styled-components";

class WeatherTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileColor: tileColors.goodWeather,
      textColor: "",
    };
  }

  showDetails = e => {
    this.props.onClickRedirect(this.props.city.name);
  };

  getWeatherIcon = () => {
    return ICON_URL + this.props.city.weather[0].icon + ".png";
  };

  refreshTileColorInState = tileColor => {
    this.setState({
      tileColor: tileColor,
    });
  };

  isBadWeather = weatherCode => {
    return weatherCode < 500 ||
      (weatherCode >= 600 && weatherCode < 700) ||
      weatherCode >= 900;
  };

  isAverageWeather = weatherCode => {
    return (weatherCode >= 500 && weatherCode < 600) ||
      (weatherCode >= 700 && weatherCode < 800) ||
      (weatherCode >= 803 && weatherCode <= 804);
  };

  isGoodWeather = weatherCode => {
    return weatherCode >= 800 && weatherCode <= 802;
  };

  resolveTileColor = weatherCode => {
    if (this.isBadWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.badWeather);
    } else if (this.isAverageWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.averageWeather);
    } else if (this.isGoodWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.goodWeather);
    }
  };

  componentDidMount() {
    this.resolveTileColor(this.props.city.weather[0].id);
  }

  onFavClick = () => {
    if (this.props.likeButton) {
      this.props.onFavClick(this.props.city, true);
    } else {
      this.props.onFavClick(this.props.city, false);
    }
  };

  renderFavButtons = () => {
    let className = "";
    if (this.props.likeButton) {
      className = "glyphicon glyphicon-thumbs-up";
    } else {
      className = "glyphicon glyphicon-thumbs-down";
    }
    return (
      <LikeIconField>
        <span className={className} onClick={this.onFavClick} />
      </LikeIconField>
    );
  };

  render() {
    return (
      <Tile
        className="text-center"
        onClick={this.showDetails}
        style={this.state.tileColor}
      >
        <div className="row">
          <div>
            <TileField>
              <TitleField style={{ color: `${this.state.textColor}` }}>
                {this.props.city.name}
              </TitleField>
            </TileField>
            <TileField>
              <img src={this.getWeatherIcon()} alt="Cannot render weather" />
            </TileField>
            <TileField>
              <span style={{ color: `${this.state.textColor}` }}>
                {this.props.city.weather[0].description}
              </span>
            </TileField>
            <TileField>
              <span style={{ color: `${this.state.textColor}` }}>
                {" "}{this.props.city.main.temp} &deg;C
              </span>
            </TileField>
          </div>
        </div>
        {this.props.showButtons ? this.renderFavButtons() : null}
      </Tile>
    );
  }
}

const tileColors = {
  goodWeather: { color: "#6d7078", backgroundColor: "#ffd600" },
  averageWeather: { color: "#FFFFFF", backgroundColor: "#7cb342" },
  badWeather: { color: "#FFFFFF", backgroundColor: "#0277bd" },
};

const ICON_URL = "http://openweathermap.org/img/w/";

const LikeIconField = styled.div`
  flex: 1;
  text-align: right;
  font-size: 120%;
`;

const TitleField = styled.b`font-size: 160%;`;

const TileField = styled.div`
  flex: 1;
  min-height: 40px;
  font-size: 150%;
`;

const Tile = styled.div`
  float: left;
  margin: 5px;
  padding: 10px;
  min-width: 200px;
  flex: 1;
  flex-direction: column;
  display: flex;
  box-shadow: 2px 2px 4px grey;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    box-shadow: 0px 0px 0px;
  }
`;

export default WeatherTile;
