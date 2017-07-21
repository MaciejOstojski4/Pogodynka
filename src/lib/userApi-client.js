import axios from "axios";

const userApiClient = axios.create({
  baseURL: "https://praktyki-react.herokuapp.com",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

const configureApi = store => {
  userApiClient.interceptors.request.use(
    function(config) {
      const state = store.getState();
      if (state.sessionReducer.user.token) {
        config.headers["X-User-Email"] = state.sessionReducer.user.userEmail;
        config.headers["X-User-Token"] = state.sessionReducer.user.token;
      }
      return config;
    },
    function(error) {
      return Promise.reject(error);
    },
  );
};

export { configureApi };
export default userApiClient;