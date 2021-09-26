import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import RouteName from "../../config/Route";

export default function SellerRoute({ component: Component, ...rest }) {
  const { currentUser, IsSeller } = useAuth();
  // let uid = rest.computedMatch.params.uid;
  if (!IsSeller) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Redirect {...props} to={RouteName.home} />;
        }}
      ></Route>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to={RouteName.home} />
        );
      }}
    ></Route>
  );
}
