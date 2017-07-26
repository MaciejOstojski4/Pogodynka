export const ADD_SEARCHED_CITY_ACTION = "saveSearchedCity";
export const SAVE_GROUP_WEATHER_ACTION = "saveSearchedWeather";
export const PARSE_SEARCHED_WEATHER_ACTION = "parseSearchedWeatherAction";

export const saveSearchedCityNameAction = cityName => {
  return {
    type: ADD_SEARCHED_CITY_ACTION,
    data: {
      name: cityName
    }
  };
};

export const parseSearchedWeatherAction = weatherData => {
  return {
    type: PARSE_SEARCHED_WEATHER_ACTION,
    data: {
      weather: weatherData
    }
  };
};
export const saveGroupWeatherAction = weatherData => {
  return {
    type: SAVE_GROUP_WEATHER_ACTION,
    data: {
      weather: weatherData
    }
  };
};
