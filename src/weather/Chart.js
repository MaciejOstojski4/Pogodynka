import React, { Component, PropTypes } from "react";
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
import MediaQuery from "react-responsive";
import styled from "styled-components";

class Chart extends Component {
  render() {
    return (
      <MediaQuery query="(min-device-width: 992px)" component="ChartContainer">
        <ChartContainer>
          <h3>
            Temperatures in next 24 hours in {this.props.cityName}
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={this.props.chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid stroke="#000" strokeDasharray="2 2" />
              <XAxis dataKey="time" />
              <YAxis />

              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={this.props.title}
                stroke="#e91b1b"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </MediaQuery>
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
export default Chart;
