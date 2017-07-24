import axios from "axios";

const userApiClient = axios.create({
  baseURL: "https://praktyki-react.herokuapp.com",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

const configureApi = store => {
  userApiClient.interceptors.request.use(
    function(config) {
      const state = store.getState();
      if (state.session.user.token) {
        config.headers["X-User-Email"] = state.session.user.email;
        config.headers["X-User-Token"] = state.session.user.token;
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
