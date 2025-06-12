import { useEffect, useState } from "react";
import axios from "../api/axios";
import { FiUser } from "react-icons/fi";

const AccountSummary = () => {
  const [summary, setSummary] = useState({
    balance: 0,
    crypto: {},
    name: "",
    email: "",
  });
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryRes, profileRes] = await Promise.all([
          axios.get("/api/account/summary", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
          axios.get("/api/user/profile", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }),
        ]);
        
        // Normalize crypto data
        const normalizedCrypto = summaryRes.data.crypto || {};
        setSummary({
          ...summaryRes.data,
          crypto: normalizedCrypto
        });
        setProfile(profileRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const formatCryptoValue = (value) => {
    // Handle different value types (string or number)
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    // Format with 8 decimal places for crypto amounts
    return isNaN(numValue) ? '0' : numValue.toFixed(8);
  };

  if (loading) return <p>Loading account data...</p>;

  return (
    <div className="bg-white p-6 rounded shadow mb-4 space-y-6">
      {/* Profile and Logout section remains the same */}

      {/* Account Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Account Summary</h2>
        <p className="mb-2">
          Main Balance: {summary.balance.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </p>

        <div>
          <h3 className="font-medium mb-2">Crypto Holdings:</h3>
          {summary.crypto && Object.keys(summary.crypto).length > 0 ? (
            <ul className="list-disc pl-6 space-y-1">
              {Object.entries(summary.crypto).map(([currency, amount]) => (
                <li key={currency}>
                  {currency.toUpperCase()}: {amount.toFixed(2)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No crypto holdings available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;