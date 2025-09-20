import React, { useState } from "react";
import { loginUser } from "../api.js";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim(); // optional, if you want to ignore trailing/leading spaces

      const res = await loginUser({
        username: trimmedUsername,
        password: trimmedPassword
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", trimmedUsername);
      onLogin(trimmedUsername);
    } catch (err) {
      alert("Login failed! Please check your credentials.");
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
