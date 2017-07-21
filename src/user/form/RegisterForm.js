import React from "react";
import userClientApi from "../../lib/userApi-client";
import { withRouter } from "react-router";

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

  registerUser = () => {
    userClientApi
      .post(REGISTER_URL, {
        user: {
          email: this.state.email,
          password: this.state.password,
        },
      })
      .then(response => {
        this.props.router.push("login-form");
      })
      .then(error => {
        console.log(error);
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
      <div className="col-md-4 col-md-offset-4 text-center">
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              id="emailInput"
              type="text"
              className="form-control"
              onChange={this.refreshState}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              id="passwordInput"
              type="password"
              className="form-control"
              onChange={this.refreshState}
            />
            <div>
              {this.state.passwordNotIdenticalErr
                ? "Passwords aren't identical"
                : ""}
            </div>
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              id="repeatPasswordInput"
              type="password"
              className="form-control"
              onChange={this.refreshState}
            />
            <div />
          </div>
          <div className="form-group">
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </form>
        <div />
        <div>
          {this.state.serverError
            ? "Server error occurred, Please try again later"
            : ""}
        </div>
      </div>
    );
  }
}

const REGISTER_URL = "/api/v1/registrations";

export default withRouter(RegisterForm);
