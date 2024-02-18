import React from "react";
import { /*useRoute,*/ Link } from "wouter";
import useUser from "../../hooks/useUser.js";

import "./Header.css";

export default function Header() {
  //const isLogged = false;
  const { isLogged, logout } = useUser();

  const handleClick = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <header className="gf-header">
      {isLogged ? (
        <Link to="#" onClick={handleClick}>
          Logout
        </Link>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </header>
  );
}
