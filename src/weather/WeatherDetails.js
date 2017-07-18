import React, { Component } from "react";
import { connect } from "react-redux";
import ForecastPlaceHolder from "./forecast/ForecastPlaceHolder";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import CurrentWeatherDetails from "./CurrentWeatherDetails";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
      forecastForChart: [],
    };
  }

  getHoursFromDate = date => {
    return date.split(" ")[1];
  };

  getDailyForecastAtHour = hour => {
    return this.props.data.list.filter(weather => {
      const weatherHour = this.getHoursFromDate(weather.dt_txt);
      if (weatherHour === hour) {
        return weather;
      }
    });
  };

  getForecastSinceTomorrow = forecast => {
    console.log(forecast);
    if (forecast.length === NUMBER_OF_DAYS_IN_FORECAST) {
      return forecast.slice(1, forecast.length);
    }
    return forecast;
  };

  prepareDataForForecast = () => {
    this.setState({
      dayForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("12:00:00"),
      ),
      nightForecast: this.getForecastSinceTomorrow(
        this.getDailyForecastAtHour("00:00:00"),
      ),
    });
  };

  parseDataForChart = () => {
    return this.props.data.list
      .map(forecast => {
        return {
          temperature: forecast.main.temp,
          time: this.getHoursFromDate(forecast.dt_txt),
        };
      })
      .slice(0, 9);
  };

  prepareDataForChart = () => {
    this.setState({
      forecastForChart: this.parseDataForChart(),
    });
  };

  componentDidMount() {
    this.prepareDataForForecast();
    this.prepareDataForChart();
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <CurrentWeatherDetails
              city={this.props.data.list[0]}
              cityName={this.props.data.city.name}
            />
          </div>
          <div className="col-md-8">
            <LineChart
              width={730}
              height={250}
              data={this.state.forecastForChart}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#000" strokeDasharray="2 2" />
              <XAxis dataKey="time" />
              <YAxis />

              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#e91b1b" />
            </LineChart>
          </div>
        </div>

        <div className="row">
          <div className="text-center">
            <h2>Forecast for 4 days</h2>
          </div>
          <ForecastPlaceHolder
            dayForecast={this.state.dayForecast}
            nightForecast={this.state.nightForecast}
          />
        </div>
      </div>
    );
  }
}

const NUMBER_OF_DAYS_IN_FORECAST = 5;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
  };
};

export default connect(mapStateToProps)(WeatherDetails);
