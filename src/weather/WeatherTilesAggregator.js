import React from "react";
import WeatherTile from "./card/WeatherTile";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { saveGroupWeatherAction } from "../actions/weather-actions";
import {
  addUserCityAction,
  changeFavCityPosition,
  removeUserCityAction,
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

  replaceDropIndex = newIndex => {
    this.setState({
      dropIndex: newIndex,
    });
  };

  redirectToDetails = cityName => {
    this.props.router.push("weatherdetails/" + cityName);
  };

  createFavCityObjectWithPositionAt = (city, position) => {
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

  removeCityFromState = city => {
    this.setState({
      cities: this.state.cities.filter(
        favCity => favCity.name !== city.favCity.name,
      ),
    });
  };

  removeCityFromFavourite = city => {
    this.props.dispatch(removeUserCityAction(city.favCity));
    if (this.props.locallyRemoved) {
      this.removeCityFromState(city);
    }
  };

  addCityToFavourite = city => {
    const favCity = this.createFavouriteCityObject(city);
    this.props.dispatch(addUserCityAction(favCity));
  };

  showFavButtons = () => {
    return this.props.userId !== "";
  };

  showLikeButton = city => {
    return city.favCity === null;
  };

  getTileProps = (city, index) => {
    return {
      key: city.name,
      city: city,
      index: index,
      onClickRedirect: this.redirectToDetails,
      onFavClick: this.changeFavStatusOnServer,
      showButtons: this.showFavButtons(),
      likeButton: this.showLikeButton(city),
      dislikeButton: !this.showLikeButton(city),
      changePositionDuringDrag: this.changePositionDuringDrag,
      changePositionOnServer: this.changePositionOnServer,
      replaceDropIndex: this.replaceDropIndex,
      draggable: this.props.draggable,
    };
  };

  getComponentToRender = () => {
    return this.state.cities.map((city, index) => {
      if (city !== undefined) {
        return <WeatherTile {...this.getTileProps(city, index)} />;
      } else {
        return <div />;
      }
    });
  };

  swapCitiesFromState = (firstIndex, secondIndex) => {
    let cities = this.state.cities;
    const firstCity = cities[firstIndex];
    cities[firstIndex] = cities[secondIndex];
    cities[secondIndex] = firstCity;
    return cities;
  };

  changePositionDuringDrag = (dragIndex, hoverIndex) => {
    const cities = this.swapCitiesFromState(dragIndex, hoverIndex);
    this.setState({
      cities: cities,
    });
  };

  changePositionOnServer = dragIndex => {
    const dragCity = this.state.cities[dragIndex];
    const dropCity = this.state.cities[this.state.dropIndex];
    const favDragCity = this.createFavCityObjectWithPositionAt(
      dragCity,
      dropCity.favCity.position,
    );
    const favDropCity = this.createFavCityObjectWithPositionAt(
      dropCity,
      dragCity.favCity.position,
    );
    this.props.dispatch(
      changeFavCityPosition(
        favDragCity,
        favDropCity,
        dragCity,
        dropCity,
        this.state.cities,
      ),
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
