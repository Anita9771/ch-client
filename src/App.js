import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Register, Login, Dashboard, AdminDashboard, NewTransaction, AdminTransactions} from "./pages";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Welcome to the App!</h1>
      <AdminDashboard />
      </div>
    // <Router>
    //   <Routes>
    //     <Route path="/register" element={<Register />} />
    // <Route path="/login" element={<Login />} />
    // <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    // <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
// <Route path="/new-transaction" element={<ProtectedRoute><NewTransaction /></ProtectedRoute>} />
// <Route path="/admin/transactions" element={<ProtectedRoute><AdminTransactions /></ProtectedRoute>} />

    //     {/* Add more routes later */}
    //   </Routes>
    // </Router>
  );
}

export default App;
