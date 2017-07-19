/**
 * Created by react on 13.07.17.
 */
import { CHANGE_DISPLAYED_DETAILS_ACTION } from "./actions/weather-actions";

const initialState = {
  cities: [],
  // raczej nie piszemy jawnie "undefined", taka wartosc bedzie jak nic nie podasz
  // jesli juz to null bym wpisal
  cityDetails: undefined
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
