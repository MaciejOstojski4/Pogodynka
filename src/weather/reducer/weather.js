import {
  ADD_SEARCHED_CITY_ACTION,
  PARSE_SEARCHED_WEATHER_ACTION,
  SAVE_GROUP_WEATHER_ACTION
} from "../../actions/weather-actions";

const initialState = {
  searchedCities: [],
  cityDetails: null,
  cityNameDetails: "",
  savedWeather: []
};

const weather = (currentState = initialState, action) => {
  switch (action.type) {
    case ADD_SEARCHED_CITY_ACTION:
      return {
        ...currentState,
        searchedCities: [...currentState.searchedCities, action.data.name]
      };
    case SAVE_GROUP_WEATHER_ACTION:
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
            showInfo: true,
            coord: action.data.weather.city.coord,
            sys: {
              id: action.data.weather.city.id
            },
            name: action.data.weather.city.name,
            main: action.data.weather.list[0].main,
            weather: [{ icon: action.data.weather.list[0].weather[0].icon }]
          }
        ]
      };

    default:
      return currentState;
  }
};

export const weatherReducer = weather;
