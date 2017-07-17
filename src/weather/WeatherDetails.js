import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
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
    data: {
    }
  }

  render() {
    console.log(this.props.data.city.name);
    const forecastData = this.props.data.list
      .map(a => {
        return {
          temperature: a.main.temp,
          time: a.dt_txt.slice(11, 16),
          day: `${a.dt_txt.slice(8, 10)}.${a.dt_txt.slice(5, 7)}`
        };
      })
      .slice(0, 9);

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
    );
  }
}

const ChartContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50vw;
  height: 30vh;
  text-align: center;
`;
const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails
  };
};

export default connect(mapStateToProps)(WeatherDetails);
