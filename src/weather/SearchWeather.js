import React, { Component } from "react";
import apiClient from "../lib/api-client";
import { connect } from "react-redux";
import { changeDisplayedDetailsAction } from "./reducer/actions/weather-actions";
import styled from "styled-components";
import { withRouter } from "react-router";

export class SearchWeather extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: "",
      errorInfo: "",
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
        this.props.dispatch(changeDisplayedDetailsAction(response.data));
        this.props.router.push("weatherdetails");
      })
      .catch(error => {
        console.log("Error while searching by city name: " + error);
        this.setState({
          errorInfo: "Cannot find this city",
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
        <SearchForm>
          <div className="col-md-10">
            <SearchInput
              className="form-control input-lg"
              placeholder="type city name or latitude:longitude..."
              type="text"
              onChange={this.refreshState}
            />
          </div>
          <div className="col-md-2">
            <SubmitButtonSubmit
              className="btn btn-lg"
              type="submit"
              onClick={this.onSubmit}
            >
              Search
            </SubmitButtonSubmit>
          </div>
        </SearchForm>
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
  box-shadow: 2px 2px 4px;
`;

const SearchInput = styled.input`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px;
`;

const SubmitButtonSubmit = styled.button`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px #888888;
  background-color: #827717;
  color: white;
  &:hover {
    color: white;
  }
`;

const SearchForm = styled.form`display: flex;`;

const SEARCH_URL = "/weather?units=metric&";

const LAT_LONG_REGEX = /(-)?[0-9]+\.[0-9]+:(-)?[0-9]+\.[0-9]+/;

export default connect()(withRouter(SearchWeather));
