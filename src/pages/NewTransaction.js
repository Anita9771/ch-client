import { useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const NewTransaction = () => {
  const [type, setType] = useState("credit");
  const [amount, setAmount] = useState("");
  const [msg, setMsg] = useState("");

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/transactions", { type, amount: Number(amount) }, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      setMsg("Request submitted!");
      setAmount("");
    } catch (err) {
      setMsg("Error submitting request");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <h2 className="text-lg font-bold mb-4">New Transaction Request</h2>
      <form onSubmit={submitRequest} className="space-y-3">
        <select onChange={e => setType(e.target.value)} value={type} className="w-full border p-2 rounded">
          <option value="credit">Credit</option>
          <option value="withdraw">Withdraw</option>
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
        {msg && <p className="text-green-600 text-sm text-center">{msg}</p>}
      </form>
    </div>
  );
};

export default NewTransaction;
