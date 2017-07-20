import { compose, createStore, combineReducers } from "redux";
import persistState from "redux-localstorage";
import { weatherReducer } from "./weather/reducer/weather";

const rootReducer = combineReducers({
  weather: weatherReducer,
});

const enhancer = compose(persistState("weather"));

const store = createStore(rootReducer, {}, enhancer);

export default store;
