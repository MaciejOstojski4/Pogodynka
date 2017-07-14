/**
 * Created by react on 13.07.17.
 */
const initialState = {
  cities: [],
  cityDetails: undefined,
  cityFromSearch: undefined,
};

const weather = (currentState = initialState, action) => {
  switch (action.type) {
    case CHANGE_FOUNDED_CITY:
      return { ...currentState, cityFromSearch: action.data.city };
    case CHANGE_DISPLAYED_DETAILS:
      return { ...currentState, cityDetails: action.data.city };
    default:
      return currentState;
  }
};

const CHANGE_FOUNDED_CITY = "changeFoundedCity";

const CHANGE_DISPLAYED_DETAILS = "changeDisplayedDetails";

export const changeDispalyedDetailsAction = city => {
  return {
    type: CHANGE_DISPLAYED_DETAILS,
    data: {
      city: city,
    },
  };
};

export const changeFoundedCityAction = city => {
  return {
    type: CHANGE_FOUNDED_CITY,
    data: {
      city: city,
    },
  };
};

export const weatherReducer = weather;
