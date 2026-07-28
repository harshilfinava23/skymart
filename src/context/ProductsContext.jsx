import React, { createContext, useState } from "react";
import { initialProducts } from "../data/productsData";

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products] = useState(initialProducts);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};