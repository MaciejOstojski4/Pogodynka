import {
  LOGIN_SUCCESS_ACTION,
  LOGOUT_ACTION,
  FETCH_USER_FAV_CITIES_ACTION,
  ADD_USER_CITY_ACTION,
  REMOVE_USER_CITY_ACTION,
  CHANGE_FAV_CITY_POSITION_ACTION
} from "../../actions/user-action";

const initialState = {
  user: {
    email: "",
    userId: "",
    token: "",
  },
  userCities: [],
};

const session = (currentState = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS_ACTION:
      return {
        ...currentState,
        user: {
          email: action.data.email,
          userId: action.data.userId,
          token: action.data.token,
        },
      };
    case LOGOUT_ACTION:
      return {
        user: {
          email: "",
          userId: "",
          token: "",
        },
        userCities: [],
      };
    case FETCH_USER_FAV_CITIES_ACTION:
      return {
        ...currentState,
        userCities: action.data.favCities,
      };
    case ADD_USER_CITY_ACTION:
      return {
        ...currentState,
        userCities: [...currentState.userCities, action.data.favCity],
      };
    case REMOVE_USER_CITY_ACTION:
      return {
        ...currentState,
        userCities: currentState.userCities.filter(
          city => city.name !== action.data.favCity.name,
        ),
      };
    case CHANGE_FAV_CITY_POSITION_ACTION:
      return {
        ...currentState,
        userCities: action.data.userCities
      }
    default:
      return currentState;
  }
};

export const sessionReducer = session;
