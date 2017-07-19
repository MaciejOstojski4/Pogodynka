// akcje raczej nie powinny byc w katalogu 'reducer'
/**
 * Created by react on 14.07.17.
 */

// akcje raczej piszemy duzymi literami i kazda akcja powinna miec unikatowa nazwe
// dobrze wiec jest zrobic jakis namespace na nie np "WEATHER/SHOW_DETAILS"
export const CHANGE_DISPLAYED_DETAILS_ACTION = "changeDisplayedDetails";

export const changeDisplayedDetailsAction = city => {
  return {
    type: CHANGE_DISPLAYED_DETAILS_ACTION,
    data: {
      city: city
    }
  };
};
