import React, { useState } from "react";
import {
  Configuration,
  SignupPostRequest,
  UsersApi,
} from "../generated-client";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const [signupRequest, setSignupRequest] = useState<SignupPostRequest>({});
  const navigate = useNavigate();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupRequest?.username || !signupRequest?.password || !signupRequest?.firstName || !signupRequest?.lastName) {
      alert("Please fill in all fields");
      return;
    }

    const config = new Configuration({
      basePath: "http://localhost:3000",
    });
    const api = new UsersApi(config);
    api
      .signupPost({
        signupPostRequest: signupRequest,
      })
      .then((response) => {
        localStorage.setItem("jwt", response.jwt as string);
        navigate("/dashboard")
      })
      .catch((error) => {
        console.error("Failed to signup:", error);
      });
  };

  return (
    <div className="bg-[#e9ecef] text-[#333] min-h-screen p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          {/* First Name Field */}
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={signupRequest?.firstName}
              onChange={(e) =>
                setSignupRequest({ ...signupRequest, firstName: e.target.value })
              }
              className="w-full p-3 border rounded-lg bg-[#e0e0e0] border-gray-400"
              placeholder="Enter your first name"
              required
            />
          </div>

          {/* Last Name Field */}
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={signupRequest?.lastName}
              onChange={(e) =>
                setSignupRequest({ ...signupRequest, lastName: e.target.value })
              }
              className="w-full p-3 border rounded-lg bg-[#e0e0e0] border-gray-400"
              placeholder="Enter your last name"
              required
            />
          </div>

          {/* Username Field */}
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
              value={signupRequest?.username}
              onChange={(e) =>
                setSignupRequest({ ...signupRequest, username: e.target.value })
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
              value={signupRequest?.password}
              onChange={(e) =>
                setSignupRequest({ ...signupRequest, password: e.target.value })
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
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}
