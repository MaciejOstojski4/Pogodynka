import React from "react";
import userClientApi from "../../lib/userApi-client";
import { withRouter } from "react-router";
import styled from "styled-components";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatedPassword: "",
      passwordNotIdenticalErr: false,
      serverError: false,
    };
  }

  refreshState = e => {
    e.preventDefault();
    switch (e.target.id) {
      case "emailInput":
        this.setState({
          email: e.target.value,
        });
        break;
      case "passwordInput":
        this.setState({
          password: e.target.value,
        });
        break;
      case "repeatPasswordInput":
        this.setState({
          repeatedPassword: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  createRegisterPayload = () => {
    return {
      user: {
        email: this.state.email,
        password: this.state.password,
      },
    }
  }

  registerUser = () => {
    userClientApi
      .post(REGISTER_URL, this.createRegisterPayload())
      .then(response => {
        this.props.router.push("login-form");
      })
      .then(error => {
        this.setState({
          serverError: true,
        });
      });
  };

  isPasswordIdentical = () => {
    return this.state.password === this.state.repeatedPassword;
  };

  showError = () => {
    this.setState({
      passwordNotIdenticalErr: true,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.isPasswordIdentical()) {
      this.registerUser();
    } else {
      this.showError();
    }
  };

  render() {
    return (
      <FormContainer className="text-center">
        <Form>
          <FormGroup className="form-group">
            <FormLabel>Email</FormLabel>
            <FormInput
              id="emailInput"
              type="text"
              className="form-control"
              onChange={this.refreshState}
            />
          </FormGroup>
          <FormGroup className="form-group">
            <FormLabel>Password</FormLabel>
            <FormInput
              id="passwordInput"
              type="password"
              className="form-control"
              onChange={this.refreshState}
            />
            <FormErrorMessage>
              {this.state.passwordNotIdenticalErr
                ? "Passwords aren't identical"
                : ""}
            </FormErrorMessage>
          </FormGroup>
          <FormGroup className="form-group">
            <FormLabel>Repeat password</FormLabel>
            <FormInput
              id="repeatPasswordInput"
              type="password"
              className="form-control"
              onChange={this.refreshState}
            />
            <div />
          </FormGroup>
          <FormGroup className="form-group">
            <FormButton type="submit" onClick={this.onSubmit}>
              Submit
            </FormButton>
          </FormGroup>
          <FormGroup>
            <FormErrorMessage>
              {this.state.serverError
                ? "Server error occurred, Please try again later"
                : ""}
            </FormErrorMessage>
          </FormGroup>
        </Form>
      </FormContainer>
    );
  }
}

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 1px 1px 2px grey;
  background-color: #cddc39;
  padding: 20px;
`;

const FormGroup = styled.div`
  padding: 10px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const FormInput = styled.input`
  box-shadow: 1px 1px 2px grey;
  min-width: 400px;
  flex: 2;
`;

const FormLabel = styled.label`
  flex: 1;
  background-color: #827717;
  padding: 5px;
  box-shadow: 1px 1px 2px grey;
  color: white;
  text-align: center;
  font-size: 90%;
`;

const FormButton = styled.button`
  flex: 1;
  background-color: #827717;
  border: none;
  color: white;
  padding: 5px;
  font-size: 130%;
  font-weight: bold;
  box-shadow: 1px 1px 2px grey;
  
  &:active {
    box-shadow: 0px 0px 0px;
  }
`;

const FormErrorMessage = styled.div`
  flex: 1;
  padding: 5px;
`;

const REGISTER_URL = "/api/v1/registrations";

export default withRouter(RegisterForm);
