import React, { Component } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import styled from "styled-components";

class Chart extends Component {
  render() {
    return (
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={this.props.chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid stroke="#000" strokeDasharray="2 2" />
            <XAxis dataKey="time" minTickGap={30} />
            <YAxis />

            <Tooltip />
            <Line
              type="monotone"
              animationDuration="2000"
              dataKey={this.props.title}
              stroke="#e91b1b"
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
  font-size: 20px;
  height: 40vh;
  margin-left: -30px;

  text-align: center;
  @media only screen and (max-height: 600px) {
    height: 50vh;
    width: 90vw;
  }
`;

export default Chart;
