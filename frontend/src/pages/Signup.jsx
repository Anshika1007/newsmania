import React, { useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icon for password toggle

const Signup = () => {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const validateForm = () => {
        let newErrors = {};

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format.";
        }

        if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Password must be at least 8 characters, include 1 uppercase letter, 1 number, and 1 special character.";
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
        if (!validateForm()) return;

        try {
            await axios.post(API_ENDPOINTS.SIGNUP, formData);
            alert("Signup Successful! Please Login.");
            navigate("/login");
        } catch (error) {
            alert("Signup Failed: " + error.response?.data?.message);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-black text-white shadow-lg rounded-lg border border-red-600">
            <h2 className="text-3xl font-bold text-center text-red-500 mb-5">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username Field */}
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                </div>

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
                    {errors.password && <span className="text-red-400 text-sm">{errors.password}</span>}
                </div>

                {/* Signup Button */}
                <button
                    type="submit"
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                    Sign Up
                </button>
            </form>

            {/* Already have an account? */}
            <p className="text-center text-gray-400 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-red-500 hover:underline">
                    Log in
                </Link>
            </p>
        </div>
    );
};

export default Signup;
