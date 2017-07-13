/**
 * Created by react on 13.07.17.
 */
import { compose, createStore, combineReducers } from "redux";
import persistState from "redux-localstorage";

const rootReducer = combineReducers({});

const enhancer = compose(persistState(""));

const store = createStore(rootReducer, {}, enhancer);

export default store;
