import { useContext, useEffect } from "react";
import { MyContext } from "../context/MyContext";
import axios from "axios";

export default function Success() {
    const {TotalPrice,navigate}= useContext(MyContext)
    useEffect(() => {
     axios.get("")
    }, [])
    
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8 text-center border border-gray-100">
        
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
          <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
        <p className="text-gray-500 text-sm mb-6">
          Thank you for your purchase. We have received your order and are getting it ready.
        </p>

        {/* Order Details Box */}
        <div className="bg-gray-50 rounded-xl p-4 text-left mb-6 border border-gray-200/60">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order Number</span>
            <span className="font-semibold text-gray-800">#987654321</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-800"></span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Amount</span>
            <span className="font-medium text-gray-800">{TotalPrice}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button onClick={()=>navigate(`/track/${id}`)}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 shadow-sm">
            Track Order
          </button>
          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2.5 px-4 rounded-xl transition duration-200">
            Continue Shopping
          </button>
        </div>

      </div>
    </div>
  );
}
