import React from "react";
import styled from "styled-components";

class SearchCityNameHint extends React.Component {
  onClick = e => {
    e.preventDefault();
    this.props.onClick(e.target.id);
  };

  render() {
    return (
      <SimilarCitiesHint>
        {this.props.similarCities.map(cityName => {
          return (
            <SimilarCitiesListElement
              key={cityName}
              id={cityName}
              onClick={this.onClick}
            >
              {cityName}
            </SimilarCitiesListElement>
          );
        })}
      </SimilarCitiesHint>
    );
  }
}

const SimilarCitiesHint = styled.div`
  z-index: 1;
  padding: 5px;
  position: absolute;
  background-color: white;
  border: 1px solid;
  border-color: #cddc39;
  font-size: 120%;
  width: 100%;
`;

const SimilarCitiesListElement = styled.div`
  width: 100%;
  &:hover {
    background-color: #cddc39;
  }
`;

export default SearchCityNameHint;
