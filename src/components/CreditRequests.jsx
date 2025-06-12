import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const CreditRequests = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [displayAmount, setDisplayAmount] = useState("");
  const [rawAmount, setRawAmount] = useState(0);
  const [message, setMessage] = useState("");

  // Format currency for display
  const formatCurrency = (value) => {
    // Remove all non-digit characters
    const numericString = value.replace(/[^\d]/g, "");
    
    // Convert to number (in cents)
    const numericValue = parseFloat(numericString) || 0;
    
    // Convert to dollars and format
    return (numericValue / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Handle amount input changes
  const handleAmountChange = (e) => {
    const input = e.target.value;
    
    // Store the raw numeric value (in cents)
    const numericString = input.replace(/[^\d]/g, "");
    setRawAmount(parseFloat(numericString) || 0);
    
    // Format for display
    setDisplayAmount(input === "" ? "" : formatCurrency(numericString));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/admin/credits/credit`,
        { userId: selectedUser, amount: rawAmount / 100 }, // Convert cents to dollars
        { headers: { Authorization: `Bearer ${getToken()}` } }
      );
      setMessage("Account successfully credited.");
      setDisplayAmount("");
      setRawAmount(0);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error crediting account.");
    }
  };

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/api/admin/users", {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Credit User Money Wallet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full p-2 border rounded"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName} ({user.email})
            </option>
          ))}
        </select>

        <input
          type="text"
          inputMode="decimal"
          placeholder="$0.00"
          value={displayAmount}
          onChange={handleAmountChange}
          className="w-full p-2 border rounded"
          required
        />
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
        >
          Credit Wallet
        </button>

        {message && (
          <p className="text-center text-sm text-green-600 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
};

export default CreditRequests;