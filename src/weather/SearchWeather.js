import React, { Component } from "react";
import apiClient from "../lib/api-client";
import { connect } from "react-redux";
import { changeFoundedCityAction } from "./reducer/weather";
import styled from "styled-components";

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
      <FormStyled>
        <div className="col-lg-10">
          <InputStyled
            className="form-control input-lg"
            placeholder="Search"
            type="text"
            onChange={this.refreshState}
          />
        </div>
        <div className="col-lg-2">
          <SubmitButtonSubmit
            className="btn btn-lg"
            type="submit"
            onClick={this.onSubmit}
          >
            Search
          </SubmitButtonSubmit>
        </div>
      </FormStyled>
    );
  }
}

const InputStyled = styled.input`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px;
`;

const SubmitButtonSubmit = styled.button`
  border: none;
  border-radius: 0px;
  box-shadow: 2px 2px 4px;
`;

const FormStyled = styled.form`
  margin-bottom: 20px;
  display: flex;
`;

const SEARCH_URL = "/weather?units=metric&";

const LAT_LONG_REGEX = /(-)?[0-9]+\.[0-9]+:(-)?[0-9]+\.[0-9]+/;

export default connect()(SearchWeather);
