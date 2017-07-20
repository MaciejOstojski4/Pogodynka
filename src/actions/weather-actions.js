export const CHANGE_DISPLAYED_DETAILS_ACTION = "changeDisplayedDetails";

export const ADD_SEARCHED_CITY_ACTION = "saveSearchedCity";

export const changeDisplayedDetailsAction = city => {
  return {
    type: CHANGE_DISPLAYED_DETAILS_ACTION,
    data: {
      city: city,
    },
  };
};

export const saveSearchedCityNameAction = cityName => {
  return {
    type: ADD_SEARCHED_CITY_ACTION,
    data: {
      name: cityName,
    },
  };
};
