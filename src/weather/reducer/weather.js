import {
  CHANGE_DISPLAYED_DETAILS_ACTION,
  ADD_SEARCHED_CITY_ACTION,
  SAVE_GROUP_WEATHER,
  PARSE_SEARCHED_WEATHER_ACTION,
  SHOW_MAP_POP_UP,
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
      console.log(action.data);
      return {
        ...currentState,
        savedWeather: action.data.weather.map(p => {
          return { ...p, showInfo: false };
        })
      };
    case PARSE_SEARCHED_WEATHER_ACTION:
      return {
        ...currentState,
        savedWeather: [
          {
            showInfo: false,
            coord: action.data.weather.city.coord,
            sys: {
              id: action.data.weather.city.id
            },
            name: action.data.weather.city.name,
            main: action.data.weather.list[0].main
          }
        ]
      };
    case SHOW_MAP_POP_UP:
      return {
        ...currentState,
        savedWeather: action.data.weather
      };
    default:
      return currentState;
  }
};

export const weatherReducer = weather;
