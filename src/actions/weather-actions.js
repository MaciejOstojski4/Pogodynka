export const CHANGE_DISPLAYED_DETAILS_ACTION = "changeDisplayedDetails";

export const ADD_SEARCHED_CITY_ACTION = "saveSearchedCity";

export const SAVE_GROUP_WEATHER = "saveSearchedWeather";
export const PARSE_SEARCHED_WEATHER_ACTION = "parseSearchedWeatherAction";

export const changeDisplayedDetailsAction = city => {
  return {
    type: CHANGE_DISPLAYED_DETAILS_ACTION,
    data: {
      city: city
    }
  };
};

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
    type: SAVE_GROUP_WEATHER,
    data: {
      weather: weatherData
    }
  };
};
