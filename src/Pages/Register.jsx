import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const navigate = useNavigate();

  // Handle input changes
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const backendUrl = "https://event-management-system-backend-zg2b.onrender.com"; 
      const response = await axios.post(
        `${backendUrl}/api/users/register`,
        userData
      );

      if (response?.data) {
        toast.success(response.data.message || "Registration successful!");
        navigate("/login");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 403) {
          toast.error(
            "Admin registration is restricted. Please choose 'User' as your role."
          );
        } else if (status === 400) {
          toast.error(
            error.response.data.message ||
              "Invalid input. Please check your details."
          );
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      } else {
        toast.error("Server is unreachable. Please try again later.");
      }
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        {/* Left Side Image */}
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full aspect-square object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        {/* Right Side Form */}
        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={submitHandler}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-yellow-400">
                Create an account
              </h3>
            </div>

            {/* Name Field */}
            <div>
              <label className="text-white text-xs block mb-2">Full Name</label>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  required
                  value={userData.name}
                  onChange={changeHandler}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  required
                  value={userData.email}
                  onChange={changeHandler}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Password</label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  required
                  value={userData.password}
                  onChange={changeHandler}
                  className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none"
                  placeholder="Enter password"
                />
              </div>
            </div>

            {/* Role Field */}
            <div className="mt-8">
              <label className="text-white text-xs block mb-2">Role</label>
              <select
                name="role"
                value={userData.role}
                onChange={changeHandler}
                className="w-full bg-transparent text-sm text-white border-b border-gray-300 focus:border-yellow-400 pl-2 pr-8 py-3 outline-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Register Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-max shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded bg-transparent bg-yellow-400 hover:bg-yellow-500 focus:outline-none"
              >
                Register
              </button>

              {/* Login Redirect */}
              <p className="text-sm text-white mt-8">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-yellow-400 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
