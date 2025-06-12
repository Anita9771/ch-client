import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom"; //
import { FiEye, FiEyeOff } from "react-icons/fi";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    ssnLast4: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!formData.agreeToTerms) {
      setMessage("You must agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/register", formData);
      setMessage(response.data.message || "Registration successful!");
      setLoading(false);
      // Optionally, redirect or clear form here
       // Redirect to login after brief delay
      setTimeout(() => {
        navigate("/login");
      }, 1500); // 1.5 seconds to show success message
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Your Banking Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="tel"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="address"
          placeholder="Street Address"
          value={formData.address}
          onChange={handleChange}
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="zipCode"
            placeholder="Zip Code"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="text"
          name="ssnLast4"
          placeholder="SSN (Last 4 digits)"
          value={formData.ssnLast4}
          onChange={handleChange}
          maxLength={4}
          pattern="\d{4}"
          title="Please enter the last 4 digits of your SSN"
          required
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password with show/hide */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <p className="text-xs text-gray-500 mb-2">
          Password must be at least 8 characters including a number and a special character.
        </p>

        {/* Confirm Password with show/hide */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            className="w-full p-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            required
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <span className="text-sm text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-md transition duration-300 ease-in-out"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      {message && (
        <p className={`mt-4 text-center text-sm font-medium ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Register;
