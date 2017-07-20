import React from "react";
import OwlCarousel from "react-owl-carousel";
import DailyForecastPlaceHolder from "./DailyForecastPlaceHolder";

class ScrolledForecastPlaceHolder extends React.Component {
  render() {
    return (
      <OwlCarousel className="owl-theme" items={1} loop={true}>
        {this.props.dayForecast.map((forecast, index) => {
          return (
            <DailyForecastPlaceHolder
              dayForecast={forecast}
              nightForecast={this.props.nightForecast[index]}
            />
          );
        })}
      </OwlCarousel>
    );
  }
}

export default ScrolledForecastPlaceHolder;
