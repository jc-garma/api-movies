import React, { Suspense } from "react";
import { Link, Route, Switch } from "wouter";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContextProvider } from "./context/UserContext.jsx";
import "./index.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Favourites } from "./pages/Favourites/Favourites.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <div className="App">
      <Suspense fallback={null}>
        <Switch>
          <Route component={App} path="/" />
          <Route component={Login} path="/login" />
          <Route component={Register} path="/register" />
          <Route component={Favourites} path="/favourites" /> 
        {/*<Route component={ErrorPage} path="/:rest*" />*/}
        </Switch>
      </Suspense>
    </div>
  </UserContextProvider>
);
