/**
 * Created by react on 13.07.17.
 */
const initialState = {
  cities: [],
  cityDetailsById: -1,
  cityFromSearch: {},
};

const weather = (currentState = initialState, action) => {
  switch (action.type) {
    case CHANGE_FOUNDED_CITY:
      return { ...currentState, cityFromSearch: action.data.city };
    default:
      return currentState;
  }
};

const CHANGE_FOUNDED_CITY = "changeFoundedCity";

export const changeFoundedCityAction = city => {
  return {
    type: CHANGE_FOUNDED_CITY,
    data: {
      city: city,
    },
  };
};

export const weatherReducer = weather;