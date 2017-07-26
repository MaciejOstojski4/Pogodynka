import React from "react";
import styled from "styled-components";
import { DragSource, DropTarget } from "react-dnd";
import { findDOMNode } from "react-dom";

class WeatherTile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tileColor: tileColors.goodWeather,
      textColor: "",
      showLikeButton: props.likeButton,
      replacedIndex: -1,
    };
  }

  showDetails = e => {
    this.props.onClickRedirect(this.props.city.name);
  };

  getWeatherIcon = () => {
    return ICON_URL + this.props.city.weather[0].icon + ".png";
  };

  refreshTileColorInState = tileColor => {
    this.setState({
      tileColor: tileColor,
    });
  };

  isBadWeather = weatherCode => {
    return (
      weatherCode < 500 ||
      (weatherCode >= 600 && weatherCode < 700) ||
      weatherCode >= 900
    );
  };

  isAverageWeather = weatherCode => {
    return (
      (weatherCode >= 500 && weatherCode < 600) ||
      (weatherCode >= 700 && weatherCode < 800) ||
      (weatherCode >= 803 && weatherCode <= 804)
    );
  };

  isGoodWeather = weatherCode => {
    return weatherCode >= 800 && weatherCode <= 802;
  };

  resolveTileColor = weatherCode => {
    if (this.isBadWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.badWeather);
    } else if (this.isAverageWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.averageWeather);
    } else if (this.isGoodWeather(weatherCode)) {
      this.refreshTileColorInState(tileColors.goodWeather);
    }
  };

  componentDidMount() {
    this.resolveTileColor(this.props.city.weather[0].id);
  }

  changeFavStatusOnServer = () => {
    if (this.props.likeButton) {
      this.props.onFavClick(this.props.city, true);
    } else {
      this.props.onFavClick(this.props.city, false);
    }
  };

  changeStarIcon = () => {
    this.setState({
      showLikeButton: !this.state.showLikeButton,
    });
  };

  onFavClick = e => {
    e.stopPropagation();
    this.changeFavStatusOnServer();
    this.changeStarIcon();
  };

  getStarIcon = () => {
    if (this.state.showLikeButton) {
      return "glyphicon glyphicon-star-empty";
    }
    return "glyphicon glyphicon-star";
  };

  renderFavButtons = () => {
    return (
      <LikeIconField>
        <span className={this.getStarIcon()} onClick={this.onFavClick} />
      </LikeIconField>
    );
  };

  setOpacity = () => {
    return this.props.isDragging ? 0 : 1;
  };

  getTileStyle = () => {
    return {
      float: "left",
      position: "relative",
      margin: "5px",
      padding: "10px",
      minWidth: "200px",
      flex: "1",
      flexDirection: "column",
      display: "flex",
      boxShadow: "2px 2px 4px grey",
      color: this.state.tileColor.color,
      backgroundColor: this.state.tileColor.backgroundColor,
      cursor: "move",
      opacity: this.setOpacity(),
    };
  };

  getDraggableComponentToRender = () => {
    return this.props.connectDragSource(
      this.props.connectDropTarget(this.getComponentToRender()),
    );
  };

  getComponentToRender = () => {
    return (
      <div
        className="text-center"
        onClick={this.showDetails}
        style={this.getTileStyle()}
      >
        <div className="row">
          <div>
            <TileField>
              <TitleField style={{ color: `${this.state.textColor}` }}>
                {this.props.city.name}
              </TitleField>
            </TileField>
            <TileField>
              <img src={this.getWeatherIcon()} alt="Cannot render weather" />
            </TileField>
            <TileField>
              <span style={{ color: `${this.state.textColor}` }}>
                {this.props.city.weather[0].description}
              </span>
            </TileField>
            <TileField>
              <span style={{ color: `${this.state.textColor}` }}>
                {" "}{this.props.city.main.temp} &deg;C
              </span>
            </TileField>
          </div>
        </div>
        {this.props.showButtons ? this.renderFavButtons() : null}
      </div>
    );
  };

  renderComponent = () => {
    if (this.props.draggable) {
      return this.getDraggableComponentToRender();
    }
    return this.getComponentToRender();
  };

  render() {
    return this.renderComponent();
  }
}

const tileColors = {
  goodWeather: { color: "#6d7078", backgroundColor: "#ffd600" },
  averageWeather: { color: "#FFFFFF", backgroundColor: "#7cb342" },
  badWeather: { color: "#FFFFFF", backgroundColor: "#0277bd" },
};

const ICON_URL = "http://openweathermap.org/img/w/";

const LikeIconField = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0px 5px 0px 5px;
  font-size: 120%;
`;

const TitleField = styled.b`font-size: 160%;`;

const TileField = styled.div`
  flex: 1;
  min-height: 40px;
  font-size: 150%;
`;

const Tile = styled.div`
  float: left;
  position: relative;
  margin: 5px;
  padding: 10px;
  min-width: 200px;
  flex: 1;
  flex-direction: column;
  display: flex;
  box-shadow: 2px 2px 4px grey;
  &:hover {
    opacity: 0.7;
  }
  &:active {
    box-shadow: 0px 0px 0px;
  }
`;

const TileSource = {
  beginDrag(props) {
    return {
      position: props.city.favCity.position,
      index: props.index,
    };
  },
};

const TileTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleX = (hoverBoundingRect.left - hoverBoundingRect.right) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientX = clientOffset.x - hoverBoundingRect.right;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }
    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.changePositionDuringDrag(dragIndex, hoverIndex);
    props.replaceIndex(dragIndex);

    monitor.getItem().index = hoverIndex;
  },
  drop(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    props.changePositionOnServer(dragIndex);
  },
};

const collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

WeatherTile.defaultProps = {
  draggable: true,
};

export default DragSource("Tile", TileSource, collectDrag)(
  DropTarget("Tile", TileTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(WeatherTile),
);
