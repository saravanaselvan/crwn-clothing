import { createContext, useContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.json";

const ProductsContext = createContext({ products: [] });

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const value = { products };

  useEffect(() => {
    setProducts(SHOP_DATA);
  }, []);
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};

export const ProductsState = () => useContext(ProductsContext);
