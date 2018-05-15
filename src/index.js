import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,Route,BrowserRouter,Redirect } from 'react-router-dom'
import './index.css';
// import App from './App';
import Main from './contents/Main/index';
import Login from './contents/Login/login'
import registerServiceWorker from './registerServiceWorker';
import {getCookie} from './utils/cookie';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        getCookie('uid') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
);

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path="/" component={Main} />
        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
