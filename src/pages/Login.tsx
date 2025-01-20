import React, { useState } from "react";
import { Configuration, LoginPostRequest, UsersApi } from "../generated-client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginRequest, setLoginRequest] = useState<LoginPostRequest>();
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginRequest?.username || !loginRequest?.password) {
      alert("Please fill in all fields");
      return;
    }

    const config = new Configuration({
      basePath: "http://localhost:3000",
    });
    const api = new UsersApi(config);
    api
      .loginPost({
        loginPostRequest: loginRequest,
      })
      .then((response) => {
        console.log(response);
        localStorage.setItem("firstName", response.firstName as string);
        localStorage.setItem("lastName", response.lastName as string);
        localStorage.setItem("jwt", response.jwt as string);
        navigate("/");
      })
      .catch(() => {
        setError("Invalid credentials!");
      });
  };

  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div className="text-red-500">{error}</div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={loginRequest?.username}
              onChange={(e) =>
                setLoginRequest({ ...loginRequest, username: e.target.value })
              }
              className="w-full p-3 border rounded-lg bg-[#e0e0e0] border-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={loginRequest?.password}
              onChange={(e) =>
                setLoginRequest({ ...loginRequest, password: e.target.value })
              }
              className="w-full p-3 border rounded-lg bg-[#e0e0e0] border-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#343a40] text-white rounded-lg hover:bg-[#000]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
