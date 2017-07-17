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
<<<<<<< HEAD
=======
  ResponsiveContainer,
  ReferenceLine
>>>>>>> wykres_fix
} from "recharts";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: [],
    };
  }

<<<<<<< HEAD
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
=======
  render() {
    console.log(this.props.data.city.name);
    const forecastData = this.props.data.list
      .map(a => {
        return {
          temperature: a.main.temp,
          time: a.dt_txt.slice(11, 16),
          day: `${a.dt_txt.slice(8, 10)}.${a.dt_txt.slice(5, 7)}`
>>>>>>> wykres_fix
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
      /*
      <ResponsiveContainer width="60%" aspec={2}>
        <LineChart
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
<<<<<<< HEAD

        <div className="text-center">
          <h2>Forecast for 4 days</h2>
        </div>
        <ForecastPlaceHolder>
          {this.state.dayForecast.map((forecast, index) => {
            return (
              <DailyForecastPlaceHolder>
                <DateTile className="text-center">
                  <h3>
                    {forecast.dt_txt.split(" ")[0]}
                  </h3>
                </DateTile>
                <h4 className="text-center">Day</h4>
                <ForecastTile forecast={forecast} backgroundColor="#8bc34a" />
                <h4 className="text-center">Night</h4>
                <ForecastTile
                  forecast={this.state.nightForecast[index]}
                  backgroundColor="#33691e"
                />
              </DailyForecastPlaceHolder>
            );
          })}
        </ForecastPlaceHolder>
      </div>
=======
      </ResponsiveContainer>
      */
      <ChartContainer>
        <h3>
          Temperatures in next 24 hours in {this.props.data.city.name}
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={forecastData}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip>
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </Tooltip>

            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#e91b1b"
              fill="#8884d8"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
>>>>>>> wykres_fix
    );
  }
}

<<<<<<< HEAD
const DateTile = styled.div`
  background-color: #827717;
  margin: 10px;
  margin-bottom: 10px;
  color: white;
  padding: 2px;
  box-shadow: 2px 2px 4px black;
`;

const DailyForecastPlaceHolder = styled.div`
  flex: 1;
  background-color: #e6ee9c;
  margin: 5px;
  box-shadow: 2px 2px 4px black;
`;

const ForecastPlaceHolder = styled.div`
  display: flex;
  flex-direction: wrap;
`;
=======
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 30vh;
  text-align: center;
`;
const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";
>>>>>>> wykres_fix

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
  };
};

export default connect(mapStateToProps)(WeatherDetails);
