import React from "react";
import { Redirect } from "react-router-dom";
import ROUTES from '../config/routes';
import {auth} from '../firebase.js';

export default function SignOut() {
    auth.signOut();
  return (
    /*<Route render={props => ( <Redirect to={ROUTES.LOGIN_PAGE} /> ) }  />*/
    /*<div>Logged Out</div>*/
    <Redirect to={ROUTES.LOGIN_PAGE} />
  );
}
