import React from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
export default function ProtectedRoute({ children }) {
  const user = Cookies.get("user");

  return user ? children : <Navigate to="/" />;
}
