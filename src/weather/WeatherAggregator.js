/**
 * Created by react on 12.07.17.
 */
import React from "react";
import axios from "axios";
import CityWeather from "./city/CityWeather";

class WeatherAggregator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      cityIds: [
        6695624,
        2988507,
        3117735,
        2643743,
        2950159,
        703448,
        524901,
        2759794,
        3143244,
        6458923,
      ],
    };
  }

  fetchWeather = () => {
    let urlWithIds =
      WEATHER_FOR_CITIES_URL + "&id=" + this.state.cityIds.join(",");
    axios
      .get(urlWithIds)
      .then(response => {
        this.setState({
          cities: response.data.list,
        });
      })
      .catch(error => {
        console.log(error);
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
                {this.state.cities.map((city, index) => {
                  return (
                    <CityWeather city={city} />
                  )
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const WEATHER_FOR_CITIES_URL =
  "http://api.openweathermap.org/data/2.5/group?units=metric&APPID=9aba8198a425a0c685d4df40f8a35b16";

export default WeatherAggregator;
