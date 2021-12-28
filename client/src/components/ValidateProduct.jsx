import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { ENDPOINT } from "../lib";
import { useNavigate } from "react-router-dom";
export default function ValidateProduct() {
  const [products, setProducts] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const navigator = useNavigate();
  useEffect(() => {
    try {
      axios.get(`${ENDPOINT}/product/notvalidated`).then((res) => {
        //console.log(res.data);
        setProducts(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div>
      <p>Validate Products</p>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Type</th>
            <th>Product Price</th>
            <th>Created By</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products.map((product) => (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.product_type}</td>
                <td>{product.product_price}</td>
                <td>{product.created_by}</td>
                <td>{product.votes}</td>
                <td>
                  <button
                    disabled={buttonState}
                    onClick={async () => {
                      setButtonState(true);
                      navigator("/dashboard");
                      await axios.get(
                        `${ENDPOINT}/product/validate/${product._id}`
                      );
                    }}
                  >
                    Vote
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
