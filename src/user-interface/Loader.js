import React from "react";
import styled from "styled-components";

class LoaderWrapper extends React.Component {
  render() {
    return (
      <LoaderContainer>
        <LoaderSquare />
      </LoaderContainer>
    );
  }
}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderSquare = styled.div`
  background-color: #7cb342;
  width: 100px;
  height: 120px;
  animation: rotate 1.5s linear infinite;
  @keyframes rotate {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;

export default LoaderWrapper;
