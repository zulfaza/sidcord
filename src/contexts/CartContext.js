import React, { useContext, useState, useEffect } from "react";
import Api from "../utils/Api";
import { useAuth } from "./AuthContext";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [Cart, setCart] = useState([]);
  const [CartNumber, setCartNumber] = useState(0);
  const [loadingContext, setLoadingContext] = useState(true);

  function updateCart() {
    Api.get(`/carts/${currentUser.uid}`).then((res) => {
      setCart(res?.data?.data);
      if (res.data.data) setCartNumber(res?.data?.data?.totalQuantity);
    });
  }

  useEffect(() => {
    setLoadingContext(false);
    if (currentUser) {
      Api.get(`/carts/${currentUser.uid}`).then((res) => {
        setCart(res?.data?.data);
        if (res.data.data) setCartNumber(res?.data?.data?.totalQuantity);
      });
    }
  }, [currentUser]);

  const value = {
    Cart,
    updateCart,
    CartNumber,
  };

  return (
    <CartContext.Provider value={value}>
      {!loadingContext && children}
    </CartContext.Provider>
  );
}
