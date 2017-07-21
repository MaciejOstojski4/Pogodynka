import { LOGIN_SUCCESS_ACTION } from "../../actions/user-action";

const initialState = {
  user: {
    email: "",
    userId: "",
    token: "",
  },
};

const session = (currentState = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_ACTION:
      return {
        user: {
          email: action.data.email,
          userId: action.data.userId,
          token: action.data.token,
        },
      };
    default:
      return currentState;
  }
};

export const sessionReducer = session;
