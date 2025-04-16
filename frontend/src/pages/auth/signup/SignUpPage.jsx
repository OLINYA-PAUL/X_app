import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import XSvg from "../../../components/svgs/X";
import {
  MdOutlineMail,
  MdPassword,
  MdDriveFileRenameOutline,
  MdArrowForward,
} from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const queryClient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch(`/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
          credentials: true,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Something went wrong");

        return data;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="max-w-screen-xl mx-auto flex h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Left side with logo and text - visible only on large screens */}
      <div className="flex-1 hidden lg:flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-gray-900 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-400 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/3 w-40 h-40 rounded-full bg-indigo-500 blur-3xl"></div>
        </div>

        <div className="p-12 flex flex-col items-center relative z-10 max-w-md">
          <XSvg className="w-2/3 fill-blue-400 mb-12" />
          <h2 className="text-4xl font-bold text-white text-center mb-6">
            Join our community
          </h2>
          <p className="text-gray-300 text-center text-lg mb-8">
            Create an account to connect with others and start sharing your
            ideas.
          </p>
          <div className="flex items-center space-x-4 mt-6">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          </div>
        </div>

        {/* Bottom attribution */}
        <div className="absolute bottom-6 text-gray-400 text-sm">
          © 2025 XApp. All rights reserved.
        </div>
      </div>

      {/* Right side with signup form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-12">
        <div className="w-full max-w-lg">
          {/* Mobile logo */}
          <div className="flex justify-center mb-8 lg:hidden">
            <XSvg className="w-20 fill-blue-500" />
          </div>

          <h1 className="text-4xl font-extrabold text-white mb-2">
            Join today
          </h1>
          <p className="text-gray-400 mb-8">
            Fill in your details to create your account
          </p>

          {/* Error message */}
          {isError && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 flex items-start">
              <div className="mr-2 mt-0.5">⚠️</div>
              <p>{error.message}</p>
            </div>
          )}

          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Email field */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-gray-300 mb-2 font-medium">
                Email
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdOutlineMail
                    className="text-gray-400 group-hover:text-blue-400 transition-colors"
                    size={20}
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your email address"
                  name="email"
                  onChange={handleInputChange}
                  value={formData.email}
                  required
                />
              </div>
            </div>

            {/* Username and Full Name fields side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label
                  htmlFor="username"
                  className="text-gray-300 mb-2 font-medium"
                >
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser
                      className="text-gray-400 group-hover:text-blue-400 transition-colors"
                      size={16}
                    />
                  </div>
                  <input
                    id="username"
                    type="text"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Choose a username"
                    name="username"
                    onChange={handleInputChange}
                    value={formData.username}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="fullName"
                  className="text-gray-300 mb-2 font-medium"
                >
                  Full Name
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdDriveFileRenameOutline
                      className="text-gray-400 group-hover:text-blue-400 transition-colors"
                      size={20}
                    />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your full name"
                    name="fullName"
                    onChange={handleInputChange}
                    value={formData.fullName}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-gray-300 mb-2 font-medium"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPassword
                    className="text-gray-400 group-hover:text-blue-400 transition-colors"
                    size={20}
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-12 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Create a secure password"
                  name="password"
                  onChange={handleInputChange}
                  value={formData.password}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-blue-400 focus:outline-none transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-2">
                Password must be at least 8 characters long
              </p>
            </div>

            {/* Terms and conditions checkbox */}
            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 h-4 w-4 accent-blue-500"
                required
              />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-blue-400 hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-400 hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Sign up button */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-4 flex items-center justify-center gap-2 bg-gradient-to-r  from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-3 px-6 rounded-lg text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-900/30"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Sign up</span>
                  <MdArrowForward size={18} />
                </>
              )}
            </button>
          </form>

          {/* Sign in option */}
          <div className="mt-10 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex-1 h-px bg-gray-700"></div>
              <p className="mx-4 text-gray-400">Or</p>
              <div className="flex-1 h-px bg-gray-700"></div>
            </div>

            <p className="text-gray-300 mb-4">Already have an account?</p>
            <Link to="/login">
              <button className="w-full bg-transparent border border-blue-500 text-blue-400 hover:bg-blue-500 hover:bg-opacity-10 transition-all duration-300 py-3 px-6 rounded-lg font-medium">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

