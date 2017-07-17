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
  Legend
} from "recharts";

class WeatherDetails extends Component {
  constructor(props) {
    super(props);
    data: {
    }
  }

  render() {
    console.log(this.props.data.list);

    const dat = [
      { uv: 4000 },
      { uv: 3000 },
      { uv: 2000 },
      { uv: 2780 },
      { uv: 1890 },
      { uv: 2390 },
      { uv: 3490 }
    ];
    console.log(dat);
    return (
      <div>
        <LineChart
          width={730}
          height={250}
          data={dat}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="name" />
          <YAxis />

          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="asd" stroke="#8884d8" />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
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
