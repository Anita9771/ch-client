import { useState } from "react";
import axios from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/login", { email, password });
      setShowOtp(true);
      setMsg("OTP sent to email.");
    } catch (err) {
      setMsg(err.response?.data?.message || "Login failed");
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/verify-otp", { email, otp });
      localStorage.setItem("token", res.data.token);
      setMsg("Login successful!");
    } catch (err) {
      setMsg(err.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={showOtp ? handleOtp : handleLogin} className="space-y-4">
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" />
        {!showOtp && <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" />}
        {showOtp && <input type="text" placeholder="Enter OTP" onChange={e => setOtp(e.target.value)} className="w-full p-2 border rounded" />}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">{showOtp ? "Verify OTP" : "Login"}</button>
      </form>
      {msg && <p className="mt-4 text-center text-sm text-green-600">{msg}</p>}
    </div>
  );
};

export default Login;
