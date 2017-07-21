/**
 * Created by react on 21.07.17.
 */
import React from "react";
import { connect } from "react-redux";
import { loginAction } from "../../actions/user-action";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
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
    }
  };

  createUserObject = () => {
    return {
      email: this.state.email,
      password: this.state.password,
    };
  };

  onSubmit = e => {
    e.preventDefault();
    const user = this.createUserObject();
    this.props.dispatch(loginAction(user));
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
            <button type="submit" onClick={this.onSubmit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(LoginForm);
