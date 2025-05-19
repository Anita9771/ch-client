import { useEffect, useState } from "react";
import axios from "../api/axios";
import { getToken } from "../utils/auth";

const AdminTransactions = () => {
  const [txns, setTxns] = useState([]);

  const fetchTxns = async () => {
    const res = await axios.get("/api/admin/transactions", {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    setTxns(res.data);
  };

  const updateStatus = async (id, status) => {
    await axios.put(`/api/admin/transactions/${id}`, { status }, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    fetchTxns();
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Transactions</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">User</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {txns.map(tx => (
            <tr key={tx._id}>
              <td className="p-2 border">{tx.user.email}</td>
              <td className="p-2 border">{tx.type}</td>
              <td className="p-2 border">${tx.amount}</td>
              <td className="p-2 border">{tx.status}</td>
              <td className="p-2 border space-x-2">
                {tx.status === "pending" && (
                  <>
                    <button onClick={() => updateStatus(tx._id, "approved")} className="bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                    <button onClick={() => updateStatus(tx._id, "rejected")} className="bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTransactions;
