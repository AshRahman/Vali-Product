import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { ENDPOINT } from "../lib";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
export default function AddProduct() {
  const [product_name, setProduct_name] = useState("");
  const [product_type, setProduct_type] = useState("");
  const [product_price, setProduct_price] = useState("");

  const navigator = useNavigate();
  const user = JSON.parse(Cookies.get("user"));
  return (
    <>
      <button
        onClick={() => {
          Cookies.remove("user");
          navigator("/");
        }}
      >
        Logout
      </button>
      <input
        type="text"
        placeholder="Product Name"
        onChange={(event) => {
          setProduct_name(event.target.value);
        }}
      />{" "}
      <br />
      <input
        type="text"
        placeholder="Product Type"
        onChange={(event) => {
          setProduct_type(event.target.value);
        }}
      />
      <br />
      <input
        type="text"
        placeholder="Product Price"
        onChange={(event) => {
          setProduct_price(event.target.value);
        }}
      />
      <br />
      <button
        onClick={async () => {
          const username = user.username;

          console.log(username);
          if (
            (product_name !== null) &
            (product_type !== null) &
            (product_price !== null)
          ) {
            await axios.post(
              `${ENDPOINT}/product`,
              {
                product_name,
                product_price,
                product_type,
                username,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
          }
        }}
      >
        Add
      </button>
    </>
  );
}
