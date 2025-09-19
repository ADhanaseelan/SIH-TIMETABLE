// Packages
import React, { useState } from "react";

// Components
import { ToastContainer, toast } from "react-toastify";

// CSS
import "react-toastify/dist/ReactToastify.css";

// Service
import api from "../service/api";

// Function
const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    try {
      const res = await api.post("/admin/login", {
        username: username.trim(),
        password: password.trim(),
      });

      if (res.status === 200) {
        window.location.reload();
      } else if (res.status === 401) {
        toast.error("Incorrect username or password.");
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        toast.error("Incorrect username or password.");
      } else {
        toast.error("Server error. Please try again later.");
      }
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen font-poppins">
      <ToastContainer position="top-right" theme="light" />
      <div className="flex-1 bg-white flex flex-col justify-center items-center">
        <p className="text-3xl font-bold text-center text-[#003366] mb-4">
          NANDHA ENGINEERING COLLEGE
        </p>
      </div>
      <div className="flex-1 bg-[#003366] flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="bg-transparent p-10 w-full max-w-sm flex flex-col items-center"
        >
          <h2 className="text-white text-2xl font-bold mb-6">Login Page</h2>

          <div className="w-full flex flex-col items-center gap-5 mb-4">
            <label className="w-full text-left text-lg font-bold text-white">
              Username :
            </label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value.trim())}
              className="w-full p-2 rounded border border-gray-300 focus:border-[#003366] focus:ring focus:ring-[#003366]/20 outline-none"
              required
            />
          </div>

          <div className="w-full flex flex-col items-center gap-5 mb-4">
            <label className="w-full text-left text-lg font-bold text-white">
              Password :
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              className="w-full p-2 rounded border border-gray-300 focus:border-[#003366] focus:ring focus:ring-[#003366]/20 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-white text-[#003366] font-bold text-lg py-2 px-8 rounded mt-6 w-3/5"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
