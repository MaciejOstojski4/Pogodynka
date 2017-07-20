import { compose, createStore, combineReducers } from "redux";
import persistState from "redux-localstorage";
import { weatherReducer } from "./weather/reducer/weather";
import { sessionReducer } from "./user/reducer/session";

const rootReducer = combineReducers({
  weather: weatherReducer,
  session: sessionReducer,
});

const enhancer = compose(persistState("weather"));

const store = createStore(rootReducer, {}, enhancer);

export default store;
