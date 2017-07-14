/**
 * Created by react on 13.07.17.
 */
import { CHANGE_DISPLAYED_DETAILS_ACTION } from "./actions/weather-actions";

const initialState = {
  cities: [],
  cityDetails: undefined,
};

const weather = (currentState = initialState, action) => {
  switch (action.type) {
    case CHANGE_DISPLAYED_DETAILS_ACTION:
      return { ...currentState, cityDetails: action.data.city };

    default:
      return currentState;
  }
};

export const weatherReducer = weather;
