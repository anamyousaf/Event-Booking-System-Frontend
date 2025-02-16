import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com";
      const response = await axios.post(
        `${backendUrl}/api/users/login`,
        userData
      );

      if (response?.data?.user && response?.data?.token) {
        const { role } = response.data.user;

        // Store token and role in localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userRole", role); // Save role

        toast.success("Login successful!");

        if (role === "admin") {
          navigate("/admin-dashboard"); 
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      const { response } = error;
      toast.error(response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="font-[sans-serif] min-h-screen flex items-center justify-center py-6 px-4 bg-gray-100">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        {/* Left Side - Login Form */}
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto bg-white">
          <form className="space-y-4" onSubmit={submitHandler}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
              <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                Sign in to your account and explore a world of possibilities.
                Your journey begins here.
              </p>
            </div>

            {/* Email Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={changeHandler}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={userData.password}
                  onChange={changeHandler}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="text-gray-800 text-sm mb-2 block">Role</label>
              <select
                name="role"
                value={userData.role}
                onChange={changeHandler}
                required
                className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Login Button */}
            <div className="!mt-8">
              <button
                type="submit"
                className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Sign in
              </button>
            </div>

            {/* Register Link */}
            <p className="text-sm !mt-8 text-center text-gray-500">
              Don't have an account?
              <Link
                to="/register"
                className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
              >
                Register here
              </Link>
            </p>
          </form>
        </div>

        {/* Right Side - Image */}
        <div className="max-md:mt-8">
          <img
            src="https://readymadeui.com/login-image.webp"
            className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover"
            alt="Dining Experience"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
