const initialState = {
  user: {
    email: "",
    userId: "",
    token: "",
  },
};

const session = (currentState = initialState, action) => {
  switch (action.type) {
    default:
      return currentState;
  }
};

export const sessionReducer = session;
