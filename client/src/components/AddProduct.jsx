import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../lib";
export default function AddProduct() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    try {
      axios.get(`${ENDPOINT}/product/validated`).then((res) => {
        console.log(res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <p>This for Adding product</p>

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
