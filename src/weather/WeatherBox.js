/**
 * Created by react on 13.07.17.
 */

/**
 * Created by react on 13.07.17.
 */
import React from "react";
import { connect } from "react-redux";

class WeatherBox extends React.Component {


  isFounded = () => {
    if(this.props.city === undefined) {
      return "text"
    } else {
      const iconSrc =
        "http://openweathermap.org/img/w/" +
        this.props.city.weather[0].icon +
        ".png";
      return (
        <div>
            <h2>{this.props.city.name} <img src={iconSrc} alt="Cannot render image" /></h2>
          <div className="row">
            <p>Temperature: {this.props.city.main.temp} &deg;C</p>
            <p>Humidity: {this.props.city.main.humidity} %</p>
            <p>Wind: {this.props.city.wind.speed} km/h</p>
          </div>
        </div>
      )
    }
  };

  render() {
    return (
      <div>
        {this.isFounded()}
      </div>
    );
  }
}

const mapStateToProps = currentState => {
  return {
    city: currentState.weather.cityFromSearch,
  };
};

export default connect(mapStateToProps)(WeatherBox);
