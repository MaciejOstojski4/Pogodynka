import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import ForecastTile from "./ForecastTile";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
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

  prepareDataForForecast = () => {
    this.setState({
      dayForecast: this.getDailyForecastAtHour("12:00:00"),
      nightForecast: this.getDailyForecastAtHour("00:00:00"),
    });
  };

  prepareDataForChart = () => {
    return this.props.data.list
      .map(a => {
        return {
          temperature: a.main.temp,
          time: this.getHoursFromDate(a.dt_txt),
          day: `${a.dt_txt.slice(8, 10)}.${a.dt_txt.slice(5, 7)}`,
          td: `${a.dt_txt.slice(11, 16)} ${a.dt_txt.slice(
            8,
            10,
          )}.${a.dt_txt.slice(5, 7)}`,
        };
      })
      .slice(0, 9);
  };

  componentDidMount() {
    this.prepareDataForForecast();
  }

  render() {
    const forecastData = this.prepareDataForChart();

    return (
      <div>
        <LineChart
          width={730}
          height={250}
          data={forecastData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid stroke="#000" strokeDasharray="2 2" />
          <XAxis dataKey="time" />
          <YAxis />

          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#e91b1b" />
        </LineChart>

        <ForecastPlaceHolder>
          {this.state.dayForecast.map((forecast, index) => {
            return (
              <ForecastTile
                dayForecast={forecast}
                nightForecast={this.state.nightForecast[index]}
              />
            );
          })}
        </ForecastPlaceHolder>
      </div>
    );
  }
}

const ForecastPlaceHolder = styled.div`
  display: flex;
  flex-direction: wrap;
`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
  };
};

export default connect(mapStateToProps)(WeatherDetails);
