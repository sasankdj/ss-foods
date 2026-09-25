import React, { useState } from 'react';

/* --- Sub Components --- */

const PaymentOption = ({ id, checked, onChange, description, children }) => (
   <div className="bg-gray-100 p-4 rounded-md border border-slate-300 max-w-sm">
      <div className="flex items-center min-h-12">
         <input
            type="radio"
            name="method"
            id={id}
            checked={checked}
            onChange={onChange}
            className="w-[18px] h-[18px] appearance-none rounded-full border border-slate-400 bg-white focus:outline-blue-500 checked:ring-2 checked:ring-inset checked:ring-white checked:bg-blue-600 cursor-pointer"
         />
         <label htmlFor={id} className="ml-4 flex gap-2 cursor-pointer items-center">
            {children}
         </label>
      </div>
      <p className="mt-4 text-sm text-slate-500 font-medium">{description}</p>
   </div>
);

const InputField = ({ label, id, ...props }) => (
   <div>
      <label htmlFor={id} className="mb-2 text-slate-900 font-medium text-sm inline-block">
         {label}
      </label>
      <input
         id={id}
         name={id}
         required
         className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
         {...props}
      />
   </div>
);

const SummaryItem = ({ label, value }) => (
   <li className="flex flex-wrap gap-4 text-sm">
      {label} <span className="ml-auto font-semibold text-slate-900">{value}</span>
   </li>
);

export default function Payment() {
   const [method, setMethod] = useState("card");

   const handlePaymentChange = (e) => {
      setMethod(e.target.id);
   };

   return (
      <section className="mt-6 px-4 md:px-8" aria-labelledby="payment-heading">
         <div className="max-w-7xl mx-auto">
            <h2 id="payment-heading" className="text-2xl text-slate-900 font-bold mb-8">
               Payment details
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
               {/* LEFT COLUMN: Payment Selection & Form */}
               <section aria-labelledby="payment-method-heading">
                  <h2 id="payment-method-heading" className="sr-only">Payment Method</h2>

                  <fieldset>
                     <legend className="sr-only">Choose payment method</legend>
                     <div className="grid gap-4 lg:grid-cols-2">

                        {/* Card Option */}
                        <PaymentOption
                           id="card"
                           checked={method === 'card'}
                           onChange={handlePaymentChange}
                           description="Pay with your debit or credit card"
                        >
                           <img src="https://readymadeui.com/images/visa.webp" className="w-12" alt="Visa card" />
                           <img src="https://readymadeui.com/images/american-express.webp" className="w-12" alt="American Express card" />
                           <img src="https://readymadeui.com/images/master.webp" className="w-12" alt="Mastercard" />
                        </PaymentOption>

                        {/* PayPal Option */}
                        <PaymentOption
                           id="paypal"
                           checked={method === 'paypal'}
                           onChange={handlePaymentChange}
                           description="Pay with your paypal account"
                        >
                           <img src="https://readymadeui.com/images/paypal.webp" className="w-20" alt="PayPal" />
                        </PaymentOption>

                     </div>
                  </fieldset>

                  {/* Payment Form */}
                  <form className="mt-12" onSubmit={(e) => e.preventDefault()}>
                     <div className="grid lg:grid-cols-2 gap-6">
                        <InputField label="Card Number" id="card-number" placeholder="1234 5678 9012 3456" autoComplete="cc-number" inputMode="numeric" />
                        <InputField label="Name on card" id="name-on-card" placeholder="John Doe" autoComplete="cc-name" />
                        <InputField label="Expiry Date" id="expiry-date" placeholder="MM/YY" autoComplete="cc-exp" />
                        <InputField label="CVV" id="cvv" placeholder="123" autoComplete="cc-csc" inputMode="numeric" />
                     </div>

                     <div className="mt-8">
                        <button
                           type="submit"
                           className="w-full px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-colors"
                        >
                           Pay $139.00
                        </button>
                     </div>
                  </form>
               </section>

               {/* RIGHT COLUMN: Order Summary & Info */}
               <aside className="space-y-8">
                  {/* Summary Section */}
                  <section aria-labelledby="summary-heading">
                     <h2 id="summary-heading" className="sr-only">Order Summary</h2>
                     <ul className="text-slate-500 font-medium space-y-4 bg-gray-100 border border-slate-300 p-4 rounded-md">
                        <SummaryItem label="Subtotal" value="$72.00" />
                        <SummaryItem label="Discount" value="$0.00" />
                        <SummaryItem label="Shipping" value="$6.00" />
                        <SummaryItem label="Tax" value="$5.00" />
                        <hr className="border-slate-300" />
                        <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                           Total <span className="ml-auto">$83.00</span>
                        </li>
                     </ul>
                  </section>

                  <div className="grid gap-y-6 gap-x-4 lg:grid-cols-2">
                     {/* Shipping Address */}
                     <section aria-labelledby="shipping-heading">
                        <h2 id="shipping-heading" className="text-sm font-semibold text-slate-900 mb-4">
                           Shipping Address
                        </h2>
                        <address className="text-slate-500 text-sm bg-gray-100 border border-slate-300 rounded-lg p-4 space-y-2 font-medium not-italic">
                           <p>Emily Johnson</p>
                           <p>425 Park Avenue</p>
                           <p>Unit 3C</p>
                           <p>San Francisco, CA 94107</p>
                        </address>
                     </section>

                     {/* Shipping Method */}
                     <section aria-labelledby="shipping-method-heading">
                        <h2 id="shipping-method-heading" className="text-sm font-semibold text-slate-900 mb-4">
                           Shipping Method
                        </h2>
                        <div className="bg-gray-100 border border-slate-300 rounded-lg p-4 font-medium">
                           <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                              </svg>
                           </div>
                           <div className="mt-3">
                              <p className="text-sm font-medium text-slate-900">Express Shipping</p>
                              <p className="text-sm text-slate-500 mt-2">
                                 Estimated delivery: April 10-11, 2026
                              </p>
                           </div>
                        </div>
                     </section>
                  </div>
               </aside>
            </div>
         </div>
      </section>
   );
};
