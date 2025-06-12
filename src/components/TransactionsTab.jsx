import { useEffect, useState } from "react";
import axios from "../api/axios";

const TransactionsTab = () => {
  const [moneyTransactions, setMoneyTransactions] = useState([]);
  const [cryptoTransactions, setCryptoTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get("/api/transactions/transactions", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const money = res.data.filter((txn) => !txn.crypto);
        const crypto = res.data.filter((txn) => txn.crypto);

        setMoneyTransactions(money);
        setCryptoTransactions(crypto);
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };
    fetchTransactions();
  }, []);

  const renderTable = (transactions, title, isCrypto = false) => (
    <div className="overflow-x-auto mb-8">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <table className="min-w-full table-auto border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left border-b">Type</th>
            {isCrypto && <th className="p-2 text-left border-b">Crypto</th>}
            <th className="p-2 text-left border-b">Amount</th>
            <th className="p-2 text-left border-b">Date</th>
            <th className="p-2 text-left border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr>
              <td colSpan={isCrypto ? 5 : 4} className="p-3 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((txn, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="p-2 capitalize">{txn.type}</td>
                {isCrypto && <td className="p-2 uppercase">{txn.crypto}</td>}
                <td className="p-2">${parseFloat(txn.amount).toFixed(2)}</td>
                <td className="p-2">{new Date(txn.date).toLocaleString()}</td>
                <td className="p-2 capitalize text-sm font-medium">
                  <span
                    className={`px-2 py-1 rounded-full ${
                      txn.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : txn.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {txn.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-white p-4 sm:p-6 rounded shadow w-full">
      <h2 className="text-lg font-semibold mb-6">Transaction History</h2>
      {renderTable(moneyTransactions, "Money Transfers")}
      {renderTable(cryptoTransactions, "Crypto Transfers", true)}
    </div>
  );
};

export default TransactionsTab;
