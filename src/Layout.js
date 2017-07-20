import React from "react";
import Header from "./user-interface/Header";
import styled from "styled-components";

class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Container className="container">
          {this.props.children}
        </Container>
      </div>
    );
  }
}

const Container = styled.div`
  padding: 0 25px 25px 25px;
  background-color: white;
  min-height: 100vh;
  height: 100%;
`;

export default Layout;
