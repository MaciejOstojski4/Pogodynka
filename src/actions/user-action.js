import userApiClient from "../lib/userApi-client";
import { hashHistory } from "react-router";

export const LOGIN_SUCCESS_ACTION = "loginSuccess";
export const FETCH_USER_FAV_CITIES_ACTION = "fetchUserFavCities";
export const ADD_USER_CITY_ACTION = "addUserCity";
export const REMOVE_USER_CITY_ACTION = "removeUserCity";
export const CHANGE_FAV_CITY_POSITION_ACTION = "changeFavouriteCityPosition";
export const LOGOUT_ACTION = "logout";

export const loginAction = user => {
  return dispatch => {
    userApiClient
      .post(LOGIN_URL, {
        user: user,
      })
      .then(response => {
        dispatch({
          type: LOGIN_SUCCESS_ACTION,
          data: {
            email: user.email,
            token: response.data.data.auth_token,
            userId: response.data.data.user_id,
          },
        });
        dispatch(fetchUserFavCitiesAction());
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchUserFavCitiesAction = () => {
  return dispatch => {
    userApiClient
      .get(USER_FAV_CITIES_URL)
      .then(response => {
        dispatch({
          type: FETCH_USER_FAV_CITIES_ACTION,
          data: {
            favCities: response.data.places,
          },
        });
        hashHistory.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addUserCityAction = favCity => {
  return dispatch => {
    userApiClient
      .post(CHANGE_FAV_CITY_STATUS_URL, favCity)
      .then(response => {
        dispatch({
          type: ADD_USER_CITY_ACTION,
          data: {
            favCity: response.data,
          },
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const removeUserCityAction = favCity => {
  return dispatch => {
    const url = `${CHANGE_FAV_CITY_STATUS_URL}/${favCity.id}`;
    userApiClient
      .delete(url)
      .then(response => {
        dispatch({
          type: REMOVE_USER_CITY_ACTION,
          data: {
            favCity: favCity,
          },
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const changeFavCityPosition = (
  favDragCity,
  favDropCity,
  dragItem,
  hoverItem,
  userCities,
) => {
  return dispatch => {
    dispatch(removeUserCityAction(dragItem));
    dispatch(removeUserCityAction(hoverItem));
    dispatch(addUserCityAction(favDragCity));
    dispatch(addUserCityAction(favDropCity));
    dispatch({
      type: CHANGE_FAV_CITY_POSITION_ACTION,
      data: {
        userCities: userCities,
      },
    });
  };
};

export const logoutAction = () => {
  return {
    type: LOGOUT_ACTION,
  };
};

const USER_FAV_CITIES_URL = "/weather/api/v1/places";

const CHANGE_FAV_CITY_STATUS_URL = "/weather/api/v1/places";

const LOGIN_URL = "/api/v1/sessions";
