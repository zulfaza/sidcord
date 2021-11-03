import React, { useContext, useState, useEffect } from "react";
import Api from "../utils/Api";
import { useAuth } from "./AuthContext";

const CartContext = React.createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const { currentUser } = useAuth();
  const [Order, setOrder] = useState([]);
  const [CartNumber, setCartNumber] = useState(0);
  const [loadingContext, setLoadingContext] = useState(true);

  function updateCart() {
    Api.get(`/carts/${currentUser.uid}`).then((res) => {
      setOrder(res?.data?.data);
      if (res.data.data) setCartNumber(res?.data?.data?.totalQuantity);
      else setCartNumber(0);
    });
  }

  useEffect(() => {
    setLoadingContext(false);
    if (currentUser) {
      Api.get(`/carts/${currentUser.uid}`).then((res) => {
        setOrder(res?.data?.data);
        if (res.data.data) setCartNumber(res?.data?.data?.totalQuantity);
      });
    }
  }, [currentUser]);

  const value = {
    Order,
    updateCart,
    CartNumber,
  };

  return (
    <CartContext.Provider value={value}>
      {!loadingContext && children}
    </CartContext.Provider>
  );
}
