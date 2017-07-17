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
      dayArray: [],
      nightArray: [],
    };
  }

  prepareData = () => {
    const dayArray = this.props.data.list.filter(val => {
      let weatherDate = val.dt_txt.split(" ")[1].toString();
      if (weatherDate === "12:00:00") {
        return val;
      }
    });

    const nightArray = this.props.data.list.filter(val => {
      let weatherDate = val.dt_txt.split(" ")[1].toString();
      if (weatherDate === "00:00:00") {
        return val;
      }
    });
    console.log(dayArray);
    console.log(nightArray);

    this.setState({
      dayArray: dayArray.slice(1,dayArray.length),
      nightArray: nightArray,
    });
  };

  componentDidMount() {
    this.prepareData();
  }

  render() {
    const dat = [
      { uv: 4000 },
      { uv: 3000 },
      { uv: 2000 },
      { uv: 2780 },
      { uv: 1890 },
      { uv: 2390 },
      { uv: 3490 },
    ];
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

        <ForecastPlaceHolder>
          {this.state.dayArray.map((city, index) => {
            return (
              <ForecastTile
                dayWeather={city}
                nightWeather={this.state.nightArray[index]}
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

const Div = styled.div`display: flex;`;

const WEATHER_FOR_SINGLE_CITY_URL = "/weather?units=metric&";

const mapStateToProps = currentState => {
  return {
    data: currentState.weather.cityDetails,
  };
};

export default connect(mapStateToProps)(WeatherDetails);
