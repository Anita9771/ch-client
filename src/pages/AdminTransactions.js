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
    await axios.put(
      `/api/admin/transactions/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    fetchTxns();
  };

  useEffect(() => {
    fetchTxns();
  }, []);

  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4">All Transactions</h2>

      {/* Scroll container for small screens */}
      <div className="overflow-x-auto">
        <table className="w-full border min-w-[600px] sm:min-w-full text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border text-left">User</th>
              <th className="p-2 border text-left">Type</th>
              <th className="p-2 border text-right">Amount</th>
              <th className="p-2 border text-left">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((tx) => (
              <tr key={tx._id} className="even:bg-gray-50">
                <td className="p-2 border">{tx.user.email}</td>
                <td className="p-2 border">{tx.type}</td>
                <td className="p-2 border text-right">${tx.amount}</td>
                <td className="p-2 border">{tx.status}</td>
                <td className="p-2 border space-x-2 text-center">
                  {tx.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(tx._id, "approved")}
                        className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(tx._id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;
