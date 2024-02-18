import React, { useState } from "react";
import { useLocation } from "wouter";
import useUser from "../../hooks/useUser.js";
import { useEffect } from "react";
//import "./Login.css";

export default function Login(/*{onLogin}*/) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  const { login, isLogged } = useUser();
  /*const {isLoginLoading, hasLoginError, login, isLogged} = useUser()*/

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password });
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Username
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button className="btn" disabled={username && password ? false : true}>Login</button>
      </form>
    </>
  );
}
