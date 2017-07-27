import React from "react";
import styled from "styled-components";

class LoaderWrapper extends React.Component {
  render() {
    return (
      <LoaderContainer>
        <LoaderSpin />
      </LoaderContainer>
    );
  }
}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderSpin = styled.div`
  background-color: white;
  border-radius: 50%;
  border: 20px solid grey;
  border-top: 20px solid #7cb342;
  box-shadow: 2px 2px 4px grey;
  width: 120px;
  height: 120px;
  animation: spin 1.5s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoaderWrapper;
