import React from "react";
import { Route, Redirect } from "react-router-dom";
import ROUTES from './config/routes';

export default function PrivateRoute({
  component: Component,
  authenticated,
  ...rest
}) {
  /*if(authenticated){
    console.log("authenticated going to component");
  }else{
    console.log("not authenticated going to Login");
  }*/
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect to={ROUTES.LOGIN_PAGE} />
        )
      }
    />
  );
}
