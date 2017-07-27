import React, { Component } from "react";
import { connect } from "react-redux";
import { saveSearchedCityNameAction } from "../actions/weather-actions";
import styled from "styled-components";
import SearchCityNameHint from "./SearchCityNameHint";
import { withRouter } from "react-router";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      errorInfo: "",
      similarCities: [],
      showHint: false,
    };
  }

  onSimilarCityNameClick = cityName => {
    this.setState({
      inputText: cityName,
      similarCities: [],
    });
  };

  updateState = (inputText, similarCities) => {
    this.setState({
      inputText: inputText,
      similarCities: similarCities,
      showHint: true,
    });
  };

  getSimilarCitiesNames = (inputText) => {
    return this.props.cities.filter(val =>
      val.toLowerCase().includes(inputText.toLowerCase()),
    );
  }

  searchDynamically = inputText => {
    if (inputText.length === 0) {
      return [];
    }
    return this.getSimilarCitiesNames(inputText);
  };

  handleChange = e => {
    e.preventDefault();
    const similarCities = this.searchDynamically(e.target.value);
    this.updateState(e.target.value, similarCities);
  };

  isAlreadySearched = () => {
    const searchedCity = this.props.cities.filter(
      city => city.toLowerCase() === this.state.inputText.toLowerCase(),
    );
    return searchedCity.length > 0;
  }

  dispatchData = () => {
    if (!this.isAlreadySearched()) {
      this.props.dispatch(saveSearchedCityNameAction(this.state.inputText));
    }
  };

  hideSearchHint = () => {
    this.setState({
      showHint: false,
    });
  }

  redirectToDetails = () => {
    this.props.router.push("weatherdetails/" + this.state.inputText);
  }

  onSubmit = e => {
    e.preventDefault();
    this.dispatchData();
    this.hideSearchHint();
    this.redirectToDetails();
  };

  showSearchHint = () => {
    if (this.state.similarCities.length > 0 && this.state.showHint) {
      return (
        <SearchCityNameHint
          similarCities={this.state.similarCities}
          onClick={this.onSimilarCityNameClick}
        />
      );
    }
    return <div />;
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
              {this.showSearchHint()}
            </div>
          </div>
          <SubmitButtonContainer>
            <SubmitButton
              className="btn btn-lg"
              type="submit"
              onClick={this.onSubmit}
            >
              Search
            </SubmitButton>
          </SubmitButtonContainer>
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

const SubmitButtonContainer = styled.div`
  @media only screen and (max-width: 767px) {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }
`;

const mapStateToProps = currentState => {
  return {
    cities: currentState.weather.searchedCities,
    data: currentState.weather,
  };
};

export default connect(mapStateToProps)(withRouter(SearchWeather));
