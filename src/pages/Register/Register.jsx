import React, {useState, useEffect} from "react";
import useUser from "../../hooks/useUser.js";
import { useLocation } from "wouter";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [, navigate] = useLocation();
  //const [registered, setRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register, registered } = useUser();

  useEffect(() => {
    if (registered) {
      navigate("/login");
    }
  }, [registered, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    await register({ username, password })
    //setRegistered(true)
    setIsSubmitting(false)
  };

  if (registered) {
    return <h4>
      Congratulations ✅! You've been successfully registered!
    </h4>
  }

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

        <button className="btn" disabled={username && password ? false : true}>
          Registrarse
        </button>
      </form>
    </>
  );
}