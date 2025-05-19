import { useState } from "react";
import axios from "../api/axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    category: "Gold",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/register", formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error registering.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border border-gray-200 rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Name" 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select 
          name="category" 
          onChange={handleChange} 
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
        >
          <option value="Gold">Gold</option>
          <option value="Silver">Silver</option>
          <option value="Platinum">Platinum</option>
        </select>
        <button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-md transition duration-300 ease-in-out mt-2"
        >
          Register
        </button>
      </form>
      {message && <p className="mt-6 text-center text-sm font-medium text-green-600">{message}</p>}
    </div>
  );
};

export default Register;

// const Register = () => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     dateOfBirth: "",
//     address: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     taxId: "",
//     accountType: "Personal",
//     investmentPreference: "Moderate",
//     initialDeposit: "",
//     referralCode: "",
//     agreeToTerms: false
//   });

//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
//     setFormData({ ...formData, [e.target.name]: value });
//   };

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (formData.password !== formData.confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }
    
//     if (!formData.agreeToTerms) {
//       setMessage("You must agree to the terms and conditions.");
//       return;
//     }
    
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/auth/register", formData);
//       setMessage(res.data.message);
//       setLoading(false);
//       // Success handling - could redirect to login or dashboard
//     } catch (err) {
//       setMessage(err.response?.data?.message || "Error registering your account.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto my-12 bg-white rounded-xl shadow-lg overflow-hidden">
//       <div className="bg-blue-700 p-6 text-white">
//         <h2 className="text-2xl font-semibold text-center">Create Your Financial Account</h2>
//         <p className="text-blue-100 text-center mt-2">Join thousands of investors building their wealth</p>
//       </div>
      
//       <div className="flex justify-center mt-4">
//         <div className="flex items-center">
//           <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</div>
//           <div className={`h-1 w-12 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//           <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</div>
//           <div className={`h-1 w-12 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
//           <div className={`rounded-full h-8 w-8 flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</div>
//         </div>
//       </div>
      
//       <form onSubmit={handleSubmit} className="p-8">
//         {step === 1 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-800 mb-6">Personal Information</h3>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
//                 <input
//                   id="firstName"
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
//                 <input
//                   id="lastName"
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//               <input
//                 id="phone"
//                 type="tel"
//                 name="phone"
//                 value={formData.phone}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div>
//               <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
//               <input
//                 id="dateOfBirth"
//                 type="date"
//                 name="dateOfBirth"
//                 value={formData.dateOfBirth}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div className="pt-4">
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium p-3 rounded-md transition duration-300 ease-in-out"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
        
//         {step === 2 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-800 mb-6">Address & Security</h3>
            
//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
//               <input
//                 id="address"
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 <input
//                   id="city"
//                   type="text"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
//                 <input
//                   id="state"
//                   type="text"
//                   name="state"
//                   value={formData.state}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
//                 <input
//                   id="zipCode"
//                   type="text"
//                   name="zipCode"
//                   value={formData.zipCode}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">SSN/Tax ID (last 4 digits)</label>
//                 <input
//                   id="taxId"
//                   type="text"
//                   name="taxId"
//                   value={formData.taxId}
//                   onChange={handleChange}
//                   className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   placeholder="xxxx"
//                   maxLength="4"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 id="password"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//                 minLength="8"
//               />
//               <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters with a number and special character</p>
//             </div>
            
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//               <input
//                 id="confirmPassword"
//                 type="password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 required
//               />
//             </div>
            
//             <div className="flex justify-between pt-4">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md transition duration-300 ease-in-out"
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 onClick={nextStep}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 ease-in-out"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
        
//         {step === 3 && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-medium text-gray-800 mb-6">Investment Details</h3>
            
//             <div>
//               <label htmlFor="accountType" className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//               <select
//                 id="accountType"
//                 name="accountType"
//                 value={formData.accountType}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 required
//               >
//                 <option value="Personal">Personal Investment</option>
//                 <option value="Retirement">Retirement (IRA)</option>
//                 <option value="Education">Education Savings</option>
//                 <option value="Business">Business Account</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="investmentPreference" className="block text-sm font-medium text-gray-700 mb-1">Investment Preference</label>
//               <select
//                 id="investmentPreference"
//                 name="investmentPreference"
//                 value={formData.investmentPreference}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
//                 required
//               >
//                 <option value="Conservative">Conservative</option>
//                 <option value="Moderate">Moderate</option>
//                 <option value="Aggressive">Aggressive</option>
//                 <option value="Custom">Custom Strategy</option>
//               </select>
//             </div>
            
//             <div>
//               <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700 mb-1">Initial Deposit Amount ($)</label>
//               <input
//                 id="initialDeposit"
//                 type="number"
//                 name="initialDeposit"
//                 value={formData.initialDeposit}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 min="0"
//                 step="100"
//                 placeholder="5000"
//               />
//               <p className="text-xs text-gray-500 mt-1">Minimum initial deposit: $1,000</p>
//             </div>
            
//             <div>
//               <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700 mb-1">Referral Code (optional)</label>
//               <input
//                 id="referralCode"
//                 type="text"
//                 name="referralCode"
//                 value={formData.referralCode}
//                 onChange={handleChange}
//                 className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               />
//             </div>
            
//             <div className="pt-2">
//               <label className="flex items-center">
//                 <input
//                   type="checkbox"
//                   name="agreeToTerms"
//                   checked={formData.agreeToTerms}
//                   onChange={handleChange}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
//                   required
//                 />
//                 <span className="ml-2 text-sm text-gray-700">
//                   I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
//                 </span>
//               </label>
//             </div>
            
//             {message && (
//               <div className={`p-3 rounded-md ${message.includes("Error") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}>
//                 {message}
//               </div>
//             )}
            
//             <div className="flex justify-between pt-4">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md transition duration-300 ease-in-out"
//               >
//                 Back
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-300 ease-in-out flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   "Create Account"
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
      
//       <div className="bg-blue-50 p-6 border-t border-blue-100">
//         <div className="flex items-center justify-center space-x-8">
//           <div className="flex items-center">
//             <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//             </svg>
//             <span className="ml-2 text-sm text-gray-600">Bank-level Security</span>
//           </div>
//           <div className="flex items-center">
//             <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd"></path>
//             </svg>
//             <span className="ml-2 text-sm text-gray-600">24/7 Support</span>
//           </div>
//           <div className="flex items-center">
//             <svg className="h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
//             </svg>
//             <span className="ml-2 text-sm text-gray-600">1M+ Customers</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
