import { CoffeeBeansApi, Configuration } from "@/generated-client";
import React, { useEffect, useState } from "react";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Username:", username, "Password:", password);
  };

  useEffect(() => {
    const config = new Configuration({
      basePath: "http://localhost:3000",
    });
    const api = new CoffeeBeansApi(config);
    api.().then((response) => {
        if (response.beans) {
          setBeans(response.beans);
        } else {
          setBeans([]); // If beans is undefined or null, set it to an empty array
        }
      }).catch((error) => {
        console.error("Failed to fetch beans:", error);
        setBeans([]); // Handle the error case gracefully
      });
    }, []);

  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded-lg bg-[#e0e0e0] border-gray-400"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
};

export default Login;
