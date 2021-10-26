import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Api from "../../utils/Api";
import GetUserToken from "../../utils/GetUserToken";
import { useCart } from "../../contexts/CartContext";

export default function AddToCartButton({ productId }) {
  const { updateCart } = useCart();
  const { currentUser, IsSeller } = useAuth();
  const [IsLoading, setIsLoading] = useState(false);
  const [Label, setLabel] = useState("Add to bag");

  const onSubmit = async () => {
    setIsLoading(true);

    const reqBody = {
      customerUID: currentUser.uid,
      productId: productId,
    };
    const config = {
      headers: {
        authentication: await GetUserToken(currentUser),
      },
    };
    const apiRes = await Api.post("/carts", reqBody, config).catch((err) => {
      console.log(err.message);
      return err;
    });

    if (apiRes.status === 200) {
      updateCart();
      setLabel("Success !");
      setTimeout(() => {
        setLabel("Add to bag");
      }, 500);
    } else {
      setLabel("Error X_x, try again later");
    }

    setIsLoading(false);
  };

  return (
    <>
      {!IsSeller && (
        <button
          onClick={onSubmit}
          disabled={IsLoading}
          type='submit'
          className='mt-10 disabled:opacity-50 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          {Label}
        </button>
      )}
    </>
  );
}
