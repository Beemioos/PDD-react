import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./authSession";
import Home from "./components/Home/Home";
import NewStatement from "./components/NewStatement/NewStatement";
import YourStatement from "./components/YourStatement/YourStatement";
import Admin from "./components/Admin/Admin";

export default function PrivateRoute({ path, component }) {
  const { user } = useAuth();

  return user ? <Route path={path} element={component} /> : <Navigate to="/" />;
}

export function PrivateRouteHome() {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);

  return user ? (user.login === 'superuser' ? <Admin /> : <Home />) : <Navigate to="/" />;
}

export function PrivateRouteNewStatements() {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);

  return user ? <NewStatement /> : <Navigate to="/" />;
}
export function PrivateRouteYourStatements() {
  const { user } = useAuth();
  console.log("User in PrivateRoute:", user);

  return user ? <YourStatement /> : <Navigate to="/" />;
}
// export function PrivateRouteAdmin() {
//   const { user } = useAuth();
//   console.log("User in PrivateRoute:", user);

//   return user.login === 'superuser' ? <Admin /> : <Navigate to="/" />;
// }
