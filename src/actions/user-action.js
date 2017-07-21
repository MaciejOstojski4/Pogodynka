import userApiClient from "../lib/userApi-client";
import { hashHistory } from "react-router";

export const LOGIN_SUCCESS_ACTION = "loginSuccess";

export const LOGOUT_ACTION = "logout";

export const loginAction = user => {
  return dispatch => {
    userApiClient
      .post(LOGIN_URL, {
        user: user,
      })
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS_ACTION,
          data: {
            email: user.email,
            token: response.data.data.aut_token,
            userId: response.data.data.user_id,
          },
        });
        hashHistory.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT_ACTION,
  };
};

const LOGIN_URL = "/api/v1/sessions";
