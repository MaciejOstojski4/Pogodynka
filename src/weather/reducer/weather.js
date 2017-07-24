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
        savedWeather: action.data.weather
      };
    case SAVE_SEARCHED_WEATHER_ACTION:
      return {
        ...currentState,
        savedWeather: [
          {
            coord: action.data.weather.city.coord,
            sys: {
              id: action.data.weather.city.id
            },
            name: action.data.weather.city.name,
            main: action.data.weather.list[0].main
          }
        ]
      };
    default:
      return currentState;
  }
};

export const weatherReducer = weather;
