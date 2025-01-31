import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setAlert({ message: "Login successful!", type: "success" });
        setTimeout(() => navigate("/"), 1000);
      } else {
        setAlert({ message: data.message, type: "error" });
      }
    } catch {
      setAlert({ message: "Something went wrong.", type: "error" });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
