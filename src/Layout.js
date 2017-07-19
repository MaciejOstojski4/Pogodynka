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
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
`;

export default Layout;
