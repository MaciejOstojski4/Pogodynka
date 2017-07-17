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
  ResponsiveContainer
} from "recharts";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);
    data: {
    }
  }

  render() {
    console.log(this.props.data);
    const forecastData = this.props.data.list.map(a => {
      return {
        temperature: a.main.temp,
        time: a.dt_txt.slice(11, 16),
        day: `${a.dt_txt.slice(8, 10)}.${a.dt_txt.slice(5, 7)}`,
        td: `${a.dt_txt.slice(11, 16)} ${a.dt_txt.slice(
          8,
          10
        )}.${a.dt_txt.slice(5, 7)}`
      };
    });

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
      </div>
    );
  }
}

const Div = styled.div`display: flex;`;

const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails
  };
};

export default connect(mapStateToProps)(WeatherDetails);
