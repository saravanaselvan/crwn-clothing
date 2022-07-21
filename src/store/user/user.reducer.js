import { ACTION_TYPES } from "./user.types";

export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        currentUser: payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
