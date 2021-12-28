import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import AddProduct from "./AddProduct";
import ValidateProduct from "./ValidateProduct";

export default function Dashboard() {
  const navigator = useNavigate();
  const user = JSON.parse(Cookies.get("user"));
  return (
    <div>
      <p>This is a Dashboard</p>
      <button
        onClick={() => {
          Cookies.remove("user");
          navigator("/");
        }}
      >
        Logout
      </button>
      {console.log(user.validator)}
      {user.validator ? <ValidateProduct /> : <AddProduct />}
    </div>
  );
}
