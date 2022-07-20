import { createContext, useContext, useEffect, useState } from "react";

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
  setIsCartOpen: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartItemCount: 0,
  addItemToCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    setCartItemCount(
      cartItems.reduce((count, item) => count + item.quantity, 0),
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
    cartItemCount,
    addItemToCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const CartState = () => useContext(CartContext);
