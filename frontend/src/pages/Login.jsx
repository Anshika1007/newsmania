import React, { useState, useContext } from "react";
import axios from "axios";
import API_ENDPOINTS from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password toggle

const Login = () => {
    const { login } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
        let newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(API_ENDPOINTS.LOGIN, formData);
    
            console.log("Full API Response:", res.data); // Log full response
    
            if (!res.data || !res.data.token || !res.data.username) {
                throw new Error("Invalid response from server");
            }
    
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("username", res.data.username);  // Fixing username access
    
            login(res.data.username, res.data.token); // Fixing function parameters
            alert("Login Successful!");
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
    
            const errorMessage = error.response?.data?.message || error.message || "Something went wrong. Please try again.";
            alert("Login Failed: " + errorMessage);
        }
    };
    
    
    
    

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-black text-white shadow-lg rounded-lg border border-red-600">
            <h2 className="text-3xl font-bold text-center text-red-500 mb-5">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
                </div>

                {/* Password Field with Toggle */}
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                    <span
                        className="absolute right-3 top-3 cursor-pointer text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                    Login
                </button>
            </form>

            {/* Don't have an account? */}
            <p className="text-center text-gray-400 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-red-500 hover:underline">
                    Sign up
                </Link>
            </p>
        </div>
    );
};

export default Login;
