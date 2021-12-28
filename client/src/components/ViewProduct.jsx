import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../lib";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export default function ViewProduct() {
  const navigator = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${ENDPOINT}/product/validated`).then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <p>Validated Products</p>
      <button
        onClick={() => {
          Cookies.remove("user");
          navigator("/");
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          navigator("/addproduct");
        }}
      >
        Go to add
      </button>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Price</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.product_price}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
