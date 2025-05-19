import { useState } from "react";
import axios from "../api/axios";

const Dashboard = () => {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <p>Welcome! You're authenticated.</p>
      </div>
    );
  };
  
  export default Dashboard;
  