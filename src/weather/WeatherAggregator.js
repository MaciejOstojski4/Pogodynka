/**
 * Created by react on 12.07.17.
 */
import React from "react";
import apiClient from "../lib/api-client";
import CityWeather from "./city/CityWeather";

class WeatherAggregator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
    };
  }

  fetchWeather = () => {
    const urlWithCitiesIds =
      WEATHER_FOR_SEVERAL_CITIES_URL + "&id=" + this.props.cityIds.join(",");
    apiClient
      .get(urlWithCitiesIds)
      .then(response => {
        this.setState({
          cities: response.data.list,
        });
      })
      .catch(error => {
        console.log(
          "Error occurred during fetching weather for cities: " + error,
        );
      });
  };

  componentDidMount() {
    this.fetchWeather();
  }

  render() {
    return (
      <div className="row">
        <div className="table-responsive">
          <table className="table table-bordered">
            <tbody>
              <tr>
                {this.state.cities.map(city => {
                  return <CityWeather city={city} />;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const WEATHER_FOR_SEVERAL_CITIES_URL = "/group?units=metric";

export default WeatherAggregator;
