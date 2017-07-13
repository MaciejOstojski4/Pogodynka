import React, { Component } from "react";
import ReactHover from "react-hover";
import InfoPopup from "../user-interface/InfoPopup";
import apiClient from "../lib/api-client";
import { connect } from "react-redux";
import { changeFoundedCityAction } from "./reducer/weather";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
    };
  }

  refreshState = e => {
    e.preventDefault();
    this.setState({
      inputText: e.target.value,
    });
  };

  isSearchingByCityName = () => {
    return !this.state.inputText.match(LAT_LONG_REGEX);
  };

  prepareUrl = () => {
    if (this.isSearchingByCityName()) {
      return `${SEARCH_URL}q=${this.state.inputText}`;
    }
    const latAndLongValue = this.state.inputText.split(":");
    return `${SEARCH_URL}lat=${latAndLongValue[0]}&lon=${latAndLongValue[1]}`;
  };

  fetchWeather = url => {
    apiClient
      .get(url)
      .then(response => {
        this.props.dispatch(changeFoundedCityAction(response.data));
      })
      .catch(error => {
        console.log("Error while searching by city name: " + error);
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const urlForWeather = this.prepareUrl();
    this.fetchWeather(urlForWeather);
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-4 col-md-offset-4 text-center">
          <form className="form-inline">
            <div className="form-group">
              <ReactHover options={REACT_HOVER_OPTS}>
                <ReactHover.Trigger>
                  <input
                    className="form-control"
                    placeholder="Search"
                    type="text"
                    onChange={this.refreshState}
                  />
                </ReactHover.Trigger>
                <ReactHover.Hover>
                  <InfoPopup text={SEARCH_INPUT_POPUP_TEXT} />
                </ReactHover.Hover>
              </ReactHover>
            </div>
            <div className="form-group">
              <button
                className="btn btn-md"
                type="submit"
                onClick={this.onSubmit}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const REACT_HOVER_OPTS = {
  followCursor: true,
  shiftX: -60,
  shiftY: 0,
};

const SEARCH_INPUT_POPUP_TEXT = "Type city name or lat:lon values";

const SEARCH_URL = "/weather?units=metric&";

const LAT_LONG_REGEX = /(-)?[0-9]+\.[0-9]+:(-)?[0-9]+\.[0-9]+/;

export default connect()(SearchWeather);
