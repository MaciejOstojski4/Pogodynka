import React from "react";
import OwlCarousel from "react-owl-carousel";
import DailyForecastPlaceholder from "./DailyForecastPlaceholder";

class ScrolledForecastPlaceholder extends React.Component {
  render() {
    return (
      <OwlCarousel className="owl-theme" items={1} loop={true}>
        {this.props.dayForecast.map((forecast, index) => {
          return (
            <DailyForecastPlaceholder
              noDay={index+1}
              onForecastClick={this.props.onForecastClick}
              dayForecast={forecast}
              nightForecast={this.props.nightForecast[index]}
            />
          );
        })}
      </OwlCarousel>
    );
  }
}

export default ScrolledForecastPlaceholder;
