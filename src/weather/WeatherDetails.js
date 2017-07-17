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
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dayForecast: [],
      nightForecast: []
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
      nightForecast: this.getDailyForecastAtHour("00:00:00")
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
            10
          )}.${a.dt_txt.slice(5, 7)}`
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
    );
  }
}

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
const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 30vh;
  text-align: center;
`;
const ForecastPlaceHolder = styled.div`
  display: flex;
  flex-direction: wrap;
`;

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails
  };
};

export default connect(mapStateToProps)(WeatherDetails);
