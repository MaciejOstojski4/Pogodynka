import React, { Component } from "react";
import {
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
    console.log(this.props);
    return (
      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={this.props.chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="time" minTickGap={30} />
            <YAxis />

            <Tooltip />
            <Line
              type="monotone"
              animationDuration={2000}
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
`;

export default Chart;
