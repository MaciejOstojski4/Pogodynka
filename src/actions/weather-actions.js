
export const CHANGE_DISPLAYED_DETAILS_ACTION = "changeDisplayedDetails";

export const changeDisplayedDetailsAction = city => {
  return {
    type: CHANGE_DISPLAYED_DETAILS_ACTION,
    data: {
      city: city
    }
  };
};
