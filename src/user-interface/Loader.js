/**
 * Created by react on 20.07.17.
 */
import React from "react";
import styled from "styled-components";

class Loader extends React.Component {
  render() {
    return <LoaderSquare />;
  }
}

const LoaderSquare = styled.div`
  background-color: #7cb342;
  border-radius: 0%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  margin: 30% 0 0 40%;
  @keyframes spin {
    0% {
      transform: rotateY(0deg);
    }
    100% {
      transform: rotateY(360deg);
    }
  }
`;

export default Loader;
