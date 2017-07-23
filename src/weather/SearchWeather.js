import React, { Component } from "react";
import apiClient from "../lib/api-client";
import { connect } from "react-redux";
import {
  changeDisplayedDetailsAction,
  saveSearchedCityNameAction
} from "../actions/weather-actions";
import styled from "styled-components";
import SearchCityNameHint from "./SearchCityNameHint";
import { withRouter } from "react-router";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      errorInfo: "",
      similarCities: []
    };
  }

  onSimilarCityNameClick = cityName => {
    this.setState({
      inputText: cityName,
      similarCities: []
    });
  };

  refreshState = (inputText, similarCities) => {
    this.setState({
      inputText: inputText,
      similarCities: similarCities
    });
  };

  searchDynamically = inputText => {
    if (inputText.length === 0) {
      return [];
    }
    return this.props.cities.filter(val =>
      val.toLowerCase().includes(inputText.toLowerCase())
    );
  };

  handleChange = e => {
    e.preventDefault();
    const similarCities = this.searchDynamically(e.target.value);
    this.refreshState(e.target.value, similarCities);
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

  dispatchData = response => {
    console.log(response.data);
    this.props.dispatch(changeDisplayedDetailsAction(response.data));
    this.props.dispatch(saveSearchedCityNameAction(response.data.city.name));
  };

  fetchWeather = url => {
    apiClient
      .get(url)
      .then(response => {
        this.dispatchData(response);
        this.props.router.push("weatherdetails");
      })
      .catch(error => {
        console.log(error);
        this.setState({
          errorInfo: "Cannot find this city"
        });
      });
  };

  onSubmit = e => {
    e.preventDefault();
    const urlForWeather = this.prepareUrl();
    this.fetchWeather(urlForWeather);
  };

  render() {
    return (
      <SearchBox>
        <SearchForm className="">
          <div className="col-xs-12 col-sm-10 col-md-10">
            <div className="row">
              <SearchInput
                className="form-control input-lg"
                placeholder="type city name or latitude:longitude..."
                type="text"
                onChange={this.handleChange}
                value={this.state.inputText}
              />
            </div>
            <div className="row">
              {this.state.similarCities.length > 0
                ? <SearchCityNameHint
                    similarCities={this.state.similarCities}
                    onClick={this.onSimilarCityNameClick}
                  />
                : <div />}
            </div>
          </div>

          <div>
            <SubmitButton
              className="btn btn-lg"
              type="submit"
              onClick={this.onSubmit}
            >
              Search
            </SubmitButton>
          </div>
        </SearchForm>
        <div className="row">
          <ErrorMessage>
            {this.state.errorInfo}
          </ErrorMessage>
        </div>
      </SearchBox>
    );
  }
}

const SearchBox = styled.div`
  background-color: #cddc39;
  padding: 20px;
  margin-bottom: 20px;
  margin-left: 5px;
  margin-right: 5px;
  box-shadow: 2px 2px 4px grey;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px grey;
`;

const SubmitButton = styled.button`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px grey;
  background-color: #827717;
  color: white;
  @media only screen and (max-width: 767px) {
    margin-top: 10px;
    margin-left: 37vw;
  }
  @media only screen and (max-width: 430px) {
    margin-left: 30vw;
  }
  &:hover {
    color: black;
  }
`;

const ErrorMessage = styled.div`margin-top: 5px;`;

const SearchForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
`;

const SEARCH_URL = "forecast?units=metric&";

const LAT_LONG_REGEX = /(-)?[0-9]+\.[0-9]+:(-)?[0-9]+\.[0-9]+/;

const mapStateToProps = currentState => {
  return {
    cities: currentState.weather.searchedCities
  };
};

export default connect(mapStateToProps)(withRouter(SearchWeather));
