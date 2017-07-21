import userApiClient from "../lib/userApi-client";
import { hashHistory } from "react-router";

export const LOGIN_SUCCESS_ACTION = "loginSuccess";

export const loginAction = user => {
  return (dispatch) => {
    console.log(user.email);
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

const LOGIN_URL = "/api/v1/sessions";
