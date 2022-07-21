import { createContext, useContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find((item) => item.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map((item) =>
      item.id === productToAdd.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const CartContext = createContext({
  isCartOpen: false,
  cartItems: [],
  cartItemCount: 0,
  cartDispatch: () => {},
  cartTotal: 0,
});

export const ACTION_TYPES = {
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
  INCREASE_QUANTITY: "INCREASE_QUANTITY",
};

const INITIAL_STATE = {
  cartItems: [],
  cartItemCount: 0,
  cartTotal: 0,
  isCartOpen: false,
};

const removeItem = (cartItems, payload) => {
  return cartItems.filter((item) => item.id !== payload.id);
};

export const CartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case ACTION_TYPES.ADD_TO_CART:
      const cartItems = addCartItem(state.cartItems, payload);
      return {
        ...state,
        cartItems,
        cartItemCount: cartItems.reduce(
          (count, item) => count + item.quantity,
          0,
        ),
        cartTotal: cartItems.reduce(
          (count, item) => count + item.quantity * item.price,
          0,
        ),
      };
    case ACTION_TYPES.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: removeItem(state.cartItems, payload),
      };
    case ACTION_TYPES.INCREASE_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    case ACTION_TYPES.DECREASE_QUANTITY:
      let items = [];

      if (payload.quantity === 1) {
        items = removeItem(state.cartItems, payload);
      } else {
        items = state.cartItems.map((item) =>
          item.id === payload.id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      }
      return {
        ...state,
        cartItems: items,
        cartItemCount: items.reduce((count, item) => count + item.quantity, 0),
        cartTotal: items.reduce(
          (count, item) => count + item.quantity * item.price,
          0,
        ),
      };
    default:
      return new Error(`Unhandled action ${type} in CartReducer`);
  }
};
export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartItemCount, cartTotal }, dispatch] =
    useReducer(CartReducer, INITIAL_STATE);

  const value = {
    isCartOpen,
    cartItems,
    cartItemCount,
    cartDispatch: dispatch,
    cartTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartState = () => useContext(CartContext);
