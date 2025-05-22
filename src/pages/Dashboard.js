// src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { AccountSummary, TransactionsTab, TransferTab, CryptoTab} from "../components";
;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("transfer");

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <AccountSummary />

      <div className="flex space-x-4 my-6 border-b">
        <button
          onClick={() => setActiveTab("transfer")}
          className={`pb-2 ${activeTab === "transfer" ? "border-b-2 border-blue-500 font-medium" : "text-gray-600"}`}
        >
          Transfer
        </button>
        <button
          onClick={() => setActiveTab("crypto")}
          className={`pb-2 ${activeTab === "crypto" ? "border-b-2 border-blue-500 font-medium" : "text-gray-600"}`}
        >
          Crypto
        </button>
        <button
          onClick={() => setActiveTab("transactions")}
          className={`pb-2 ${activeTab === "transactions" ? "border-b-2 border-blue-500 font-medium" : "text-gray-600"}`}
        >
          Transactions
        </button>
      </div>

      <div>
        {activeTab === "transfer" && <TransferTab />}
        {activeTab === "crypto" && <CryptoTab />}
        {activeTab === "transactions" && <TransactionsTab />}
      </div>
    </div>
  );
};

export default Dashboard;
