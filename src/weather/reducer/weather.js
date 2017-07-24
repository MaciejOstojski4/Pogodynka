import {
  CHANGE_DISPLAYED_DETAILS_ACTION,
  ADD_SEARCHED_CITY_ACTION,
  SAVE_GROUP_WEATHER,
  SAVE_SEARCHED_WEATHER_ACTION
} from "../../actions/weather-actions";

const initialState = {
  searchedCities: [],
  cityDetails: null,
  savedWeather: []
};

const weather = (currentState = initialState, action) => {
  console.log(action.data);
  switch (action.type) {
    case CHANGE_DISPLAYED_DETAILS_ACTION:
      return {
        ...currentState,
        cityDetails: action.data.city
      };
    case ADD_SEARCHED_CITY_ACTION:
      return {
        ...currentState,
        searchedCities: [...currentState.searchedCities, action.data.name]
      };
    case SAVE_GROUP_WEATHER:
      return {
        ...currentState,
        savedWeather: [action.data.weather]
      };
    case SAVE_SEARCHED_WEATHER_ACTION:
      console.log(action.data);
      return {
        ...currentState,
        savedWeather: action.data.weather
      };
    default:
      return currentState;
  }
};

export const weatherReducer = weather;
