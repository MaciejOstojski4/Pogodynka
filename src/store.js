import { compose, createStore, combineReducers, applyMiddleware } from "redux";
import persistState from "redux-localstorage";
import { weatherReducer } from "./weather/reducer/weather";
import { sessionReducer } from "./user/reducer/session";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  weather: weatherReducer,
  session: sessionReducer,
});

const enhancer = compose(applyMiddleware(thunk), persistState("weather"));

const store = createStore(rootReducer, {}, enhancer);

export default store;
