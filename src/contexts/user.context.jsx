import { createContext, useEffect, useReducer, useState } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer.utils";

export const UserContext = createContext({});

const ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
const UserReducer = (_state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CURRENT_USER":
      return {
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action ${type} in UserReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  const value = { ...state };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(createAction(ACTION_TYPES.SET_CURRENT_USER, user));
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
