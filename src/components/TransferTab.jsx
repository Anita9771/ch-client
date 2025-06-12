import { useState, useEffect } from "react";
import axios from "../api/axios";

// Utility to format as USD currency string
const formatCurrency = (value) => {
  const number = parseFloat(value.replace(/[^\d]/g, "")) / 100;
  if (isNaN(number)) return "";
  return number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const TransferTab = () => {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("withdraw");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [message, setMessage] = useState("");
  const [accountBalance, setAccountBalance] = useState(0); // in dollars

  // Fetch user account balance on component mount
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await axios.get("/api/account/balance", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAccountBalance(res.data.balance); // assuming response has balance in dollars
      } catch (error) {
        console.error("Failed to fetch balance");
      }
    };

    fetchBalance();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount) / 100; // Convert cents to dollars

    // Check balance if withdraw
    if (type === "withdraw" && numericAmount > accountBalance) {
      setMessage(
        `Insufficient balance. Your current balance is ${accountBalance.toLocaleString(
          "en-US",
          { style: "currency", currency: "USD" }
        )}.`
      );
      return;
    }

    const payload = {
      amount: numericAmount,
      type,
      ...(type === "withdraw" && { accountNumber, bankName, accountName }),
    };

    try {
      const res = await axios.post("/api/account/transfer", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Transfer failed");
    }
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    setAmount(raw);
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Money Transfer</h2>
      <form onSubmit={handleTransfer} className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="withdraw">Withdraw</option>
          {/* <option value="credit">Credit</option> */}
        </select>

        <input
          type="text"
          inputMode="numeric"
          placeholder="$0.00"
          value={formatCurrency(amount)}
          onChange={handleAmountChange}
          className="w-full p-2 border rounded"
          required
        />

        {type === "withdraw" && (
          <>
            <input
              type="text"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Account Name"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center text-sm ${
            message.includes("Insufficient") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default TransferTab;
