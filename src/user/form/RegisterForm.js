import React from "react";
import userClientApi from "../../lib/userApi-client";

class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      repeatedPassword: "",
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
      case "repeatInput":
        this.setState({
          repeatedPassword: e.target.value,
        });
        break;
    }
  };

  onSubmit = e => {
    e.preventDefault();
    userClientApi.post(REGISTER_URL, {
      user: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        console.log(response);
      })
      .then(error => {
        console.log(error);
      })
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
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              id="repeatPasswordInput"
              type="password"
              className="form-control"
              onChange={this.refreshState}
            />
          </div>
          <div className="form-group">
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const REGISTER_URL = "/api/v1/registrations";

export default RegisterForm;
