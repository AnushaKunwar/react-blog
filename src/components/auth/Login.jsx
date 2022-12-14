import React, { useState, useEffect } from "react";
import "./../../css/form.scss";
import Axios from "./../../api/server";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      window.location.href = "/admin/create/";
    }
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const res = await Axios.post("/api/v1/auth/login", data);
      console.log(res.data.data);
      if (res.status === 200) {
        localStorage.setItem("id", res.data.data.id);
        localStorage.setItem("token", res.data.data.token);
        window.location.href = "/admin/create/";
      }
    } catch (err) {
      setErr(err.response.data.err);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <>
      <div className="form-wrapper">
        <h2>Login</h2>
        {err && (
          <div className="err">
            <p>{err}</p>
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="btn-wrapper">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
