import { CHANGE_DISPLAYED_DETAILS_ACTION, ADD_SEARCHED_CITY_ACTION } from "../../actions/weather-actions";

const initialState = {
  searchedCities: [],
  cityDetails: null,
};

const weather = (currentState = initialState, action) => {
  switch (action.type) {
    case CHANGE_DISPLAYED_DETAILS_ACTION:
      return { ...currentState, cityDetails: action.data.city };
    case ADD_SEARCHED_CITY_ACTION:
      return {
        ...currentState,
        searchedCities: [...currentState.searchedCities, action.data.name],
      };
    default:
      return currentState;
  }
};

export const weatherReducer = weather;
