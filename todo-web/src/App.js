import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";

import 'bootstrap/dist/css/bootstrap.min.css';


function PrivateRoute({ children, ...props }) {
  const token = localStorage.getItem('token_todo')
  return (
    <Route
      {...props}
      render={({ location }) =>
        token ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <PrivateRoute exact path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
