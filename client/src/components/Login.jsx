import React from "react";
import axios from "axios";
import { ENDPOINT } from "../lib";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigator = useNavigate();
  const user = Cookies.get("user");
  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <div>
      <input
        type=""
        name=""
        id=""
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type=""
        name=""
        id=""
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <button
        onClick={async () => {
          console.log(username, password);
          if ((username !== null) & (password !== null)) {
            const user = await axios.post(
              `${ENDPOINT}/login`,
              {
                username,
                password,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (user.data) {
              document.cookie = `user=${JSON.stringify(
                user.data
              )}; max-age=36000; path=/`;
              navigator("/dashboard");
            }
          } else {
            console.log("Yoolo");
          }
        }}
      >
        Submit
      </button>
    </div>
  );
}
