import React, { Component } from "react";
import SearchWeather from "../weather/SearchWeather";
import MarkerClustererExample from "./mapWithMarkers";
import { connect } from "react-redux";
class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapData: this.props.data
    };
  }
  markerClick = marker => {
    const temp = this.state.mapData;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = true;
      }
      this.setState({
        mapData: temp
      });
    });
  };
  popUpHide = marker => {
    const temp = this.state.mapData;
    temp.map(p => {
      if (p === marker) {
        p.showInfo = false;
      }
      this.setState({
        mapData: temp
      });
    });
  };
  render() {
    return (
      <div>
        <div className="row">
          <SearchWeather />
          <MarkerClustererExample
            markers={this.state.mapData}
            markerClick={this.markerClick}
            popUpHide={this.popUpHide}
          />
        </div>
      </div>
    );
  }
}
const mapStateToProps = currentState => {
  return {
    data: currentState.weather.savedWeather
  };
};
export default connect(mapStateToProps)(Container);
