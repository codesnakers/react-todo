import React from 'react';
import ReactDOM from 'react-dom';
/*import { Route, Link, BrowserRouter as Router , Switch } from 'react-router-dom'*/
import './index.css';
/*import ROUTES from './config/routes';*/
import App from './App';
/*import LoginSection from './components/LoginSection';
import SignupSection from './components/SignupSection';
import Notfound from './notfound'*/

import * as serviceWorker from './serviceWorker';


/*const routing = (
    <Router>
      <div>
      <Switch>
        <Route exact path={ROUTES.APP_PAGE} component={App} />
        <Route exact path={ROUTES.LOGIN_PAGE} component={LoginSection} />
        <Route exact path={ROUTES.SIGNUP_PAGE} component={SignupSection} />
        <Route component={Notfound} />
        </Switch>
      </div>
    </Router>
)
  ReactDOM.render(routing, document.getElementById('root'));*/


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
