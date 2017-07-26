import React from "react";
import WeatherTile from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import apiClient from "../lib/api-client";
import {
  changeDisplayedDetailsAction,
  saveGroupWeatherAction,
} from "../actions/weather-actions";
import {
  addUserCityAction,
  removeUserCityAction,
  changeFavCityPosition,
} from "../actions/user-action";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

class WeatherCardAggregator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: props.weatherItems,
      dropIndex: -1,
    };
  }

  replaceIndex = newIndex => {
    this.setState({
      dropIndex: newIndex,
    });
  };

  prepareUrl = cityName => {
    return `${SEARCH_URL}q=${cityName}`;
  };

  fetchWeather = url => {
    apiClient
      .get(url)
      .then(response => {
        this.props.dispatch(changeDisplayedDetailsAction(response.data));
      })
      .catch(error => {
        this.setState({
          errorInfo: "Cannot find this city",
        });
      });
  };

  redirectToDetails = cityName => {
    const url = this.prepareUrl(cityName);
    this.fetchWeather(url);
    this.props.router.push("weatherdetails");
  };

  createFavouriteCityObjectWithPositionAt = (city, position) => {
    const favCity = this.createFavouriteCityObject(city);
    return {
      ...favCity,
      position: position,
    };
  };

  createFavouriteCityObject = city => {
    return {
      place: {
        name: city.name,
        external_id: city.id,
        lat: city.coord.lat,
        lon: city.coord.lon,
        description: "",
      },
    };
  };

  changeFavStatusOnServer = (city, like) => {
    if (like) {
      this.addCityToFavourite(city);
    } else {
      this.removeCityFromFavourite(city);
    }
  };

  removeCityFromFavourite = city => {
    this.props.dispatch(removeUserCityAction(city));
  };

  addCityToFavourite = city => {
    const favCity = this.createFavouriteCityObject(city);
    this.props.dispatch(addUserCityAction(favCity));
  };

  getComponentToRender = () => {
    console.log(this.state.cities);
    return this.state.cities.map((city, index) => {
      if (city !== undefined) {
        return (
          <WeatherTile
            key={city.name}
            city={city}
            index={index}
            onClickRedirect={this.redirectToDetails}
            onFavClick={this.changeFavStatusOnServer}
            showButtons={this.props.userId !== ""}
            likeButton={city.favCity === null}
            dislikeButton={city.favCity !== null}
            changePosition={this.changePosition}
            changePositionOnServer={this.changePositionOnServer}
            replaceIndex={this.replaceIndex}
          />
        );
      } else {
        return <div />;
      }
    });
  };

  changePosition = (dragIndex, hoverIndex) => {
    const dragItem = this.state.cities[dragIndex];
    const hoverItem = this.state.cities[hoverIndex];
    const cities = this.state.cities;
    cities[dragIndex] = hoverItem;
    cities[hoverIndex] = dragItem;
    this.setState({
      cities: cities,
    });
  };

  changePositionOnServer = (dragIndex) => {
    const dragCity = this.state.cities[dragIndex];
    const dropCity = this.state.cities[this.state.dropIndex];
    const favDragCity = this.createFavouriteCityObjectWithPositionAt(
      dragCity,
      dropCity.favCity.position,
    );
    console.log("dragCities");
    console.log(dragCity);
    console.log(favDragCity);
    const favDropCity = this.createFavouriteCityObjectWithPositionAt(
      dropCity,
      dragCity.favCity.position,
    );
    console.log("dropCities");
    console.log(dropCity);
    console.log(favDropCity);
    this.props.dispatch(
      changeFavCityPosition(favDragCity, favDropCity, dragCity, dropCity, this.state.cities),
    );
  };

  componentDidMount() {
    this.props.dispatch(saveGroupWeatherAction(this.state.cities));
  }

  render() {
    return (
      <div>
        <MediaQuery
          query="(max-device-width: 700px)"
          component={AggregatorResponsiveColumn}
        >
          {this.getComponentToRender()}
        </MediaQuery>
        <MediaQuery
          query="(min-device-width: 701px)"
          component={AggregatorResponsiveRow}
        >
          {this.getComponentToRender()}
        </MediaQuery>
      </div>
    );
  }
}

const AggregatorResponsiveRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const AggregatorResponsiveColumn = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;
`;

const SEARCH_URL = "forecast?units=metric&";

const mapStateToProps = currentState => {
  return {
    userId: currentState.session.user.userId,
    token: currentState.session.user.token,
    data: currentState.weather,
  };
};

export default connect(mapStateToProps)(
  DragDropContext(HTML5Backend)(withRouter(WeatherCardAggregator)),
);
