const orderData = {
   orderNumber: "#ORD-78945",
   date: "June 15, 2025",
   total: "$367.00",
   status: "Paid",
   shipping: {
      customer: "Alex Johnson",
      method: "Express Delivery",
      address: "123 Main St, Apt 4B",
      phone: "(555) 123-4567",
   },
   items: [
      {
         id: 1,
         name: "Stylish Golden Watch",
         color: "Golden",
         quantity: 1,
         price: "$129.00",
         image: "https://readymadeui.com/images/watch1.webp",
         alt: "Stylish Golden Watch",
      },
      {
         id: 2,
         name: "Velvet Sneaker",
         color: "Black/White",
         quantity: 1,
         price: "$238.00",
         image: "https://readymadeui.com/images/product14.webp",
         alt: "Velvet Sneaker",
      },
   ],
   summary: {
      subtotal: "$367.00",
      shipping: "$0.00",
      tax: "$29.36",
      total: "$396.36",
   },
};

export default function OrderSummary() {
   return (
      <main className="py-4 px-4 md:px-8">
         <div className="max-w-xl mx-auto bg-white w-full rounded-2xl shadow-xs border border-slate-300 overflow-hidden">
            {/* Header */}
            <header className="bg-blue-600 px-6 py-4">
               <div className="flex items-center justify-between gap-2">
                  <h1 className="text-lg font-bold text-white">Order Confirmation</h1>
                  <span
                     className="bg-white/20 text-white text-xs font-medium px-2.5 py-1 rounded-full"
                     aria-label="Payment status: Paid"
                  >
                     Paid
                  </span>
               </div>
               <p className="text-slate-100 text-sm mt-1.5">Thank you for your order!</p>
            </header>

            <div className="p-6">
               {/* Order Meta */}
               <section aria-labelledby="order-details-heading">
                  <h2 id="order-details-heading" className="sr-only">Order Details</h2>
                  <dl className="flex flex-wrap justify-between items-center gap-4">
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Order Number</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">{orderData.orderNumber}</dd>
                     </div>
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Date</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">
                           <time dateTime="2025-06-15">{orderData.date}</time>
                        </dd>
                     </div>
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Total</dt>
                        <dd className="text-sm font-medium text-blue-700 mt-2">{orderData.total}</dd>
                     </div>
                  </dl>
               </section>

               {/* Shipping */}
               <section
                  className="bg-gray-100 rounded-xl p-4 mt-8"
                  aria-labelledby="shipping-heading"
               >
                  <h2
                     id="shipping-heading"
                     className="text-base font-semibold text-slate-900 mb-6"
                  >
                     Shipping Information
                  </h2>
                  <dl className="grid sm:grid-cols-2 gap-4">
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Customer</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">{orderData.shipping.customer}</dd>
                     </div>
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Shipping Method</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">{orderData.shipping.method}</dd>
                     </div>
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Address</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">{orderData.shipping.address}</dd>
                     </div>
                     <div>
                        <dt className="text-slate-600 text-sm font-medium">Phone</dt>
                        <dd className="text-slate-900 text-sm font-medium mt-2">{orderData.shipping.phone}</dd>
                     </div>
                  </dl>
               </section>

               {/* Items */}
               <section className="mt-8" aria-labelledby="items-heading">
                  <h2
                     id="items-heading"
                     className="text-base font-semibold text-slate-900 mb-6"
                  >
                     Order Items ({orderData.items.length})
                  </h2>

                  <ul className="space-y-4" aria-label="Ordered items list">
                     {orderData.items.map((item, index) => (
                        <li key={item.id}>
                           <div className="flex flex-col items-start gap-4 sm:flex-row">
                              <div
                                 className="w-[70px] h-[70px] bg-gray-200 rounded-lg flex items-center justify-center shrink-0"
                                 aria-hidden="true"
                              >
                                 <img
                                    src={item.image}
                                    alt={item.alt}
                                    className="w-14 h-14 object-contain rounded-sm"
                                 />
                              </div>

                              <div className="flex-1">
                                 <h3 className="text-sm font-medium text-slate-900">{item.name}</h3>
                                 <p className="text-slate-600 text-xs mt-2">Color: <span
                                    className="font-medium">{item.color}</span></p>
                                 <p className="text-slate-600 text-xs mt-1">Quantity: <span
                                    className="font-medium">{item.quantity}</span></p>
                              </div>

                              <div className="text-right">
                                 <p
                                    className="text-slate-900 text-sm font-semibold"
                                    aria-label={`Price: ${item.price}`}
                                 >
                                    {item.price}
                                 </p>
                              </div>
                           </div>

                           {index < orderData.items.length - 1 && (
                              <hr className="my-4 border-slate-300" />
                           )}
                        </li>
                     ))}
                  </ul>
               </section>

               {/* Summary */}
               <section
                  className="bg-gray-100 rounded-xl p-4 mt-8"
                  aria-labelledby="summary-heading"
               >
                  <h2
                     id="summary-heading"
                     className="text-base font-semibold text-slate-900 mb-6"
                  >
                     Order Summary
                  </h2>

                  <dl className="space-y-4">
                     <div className="flex justify-between">
                        <dt className="text-sm text-slate-500 font-medium">Subtotal</dt>
                        <dd className="text-slate-900 text-sm font-semibold">{orderData.summary.subtotal}</dd>
                     </div>
                     <div className="flex justify-between">
                        <dt className="text-sm text-slate-500 font-medium">Shipping</dt>
                        <dd className="text-slate-900 text-sm font-semibold">{orderData.summary.shipping}</dd>
                     </div>
                     <div className="flex justify-between">
                        <dt className="text-sm text-slate-500 font-medium">Tax</dt>
                        <dd className="text-slate-900 text-sm font-semibold">{orderData.summary.tax}</dd>
                     </div>
                     <div className="flex justify-between pt-3 border-t border-slate-300">
                        <dt className="text-sm font-semibold text-slate-900">Total</dt>
                        <dd className="text-sm font-semibold text-slate-900">{orderData.summary.total}</dd>
                     </div>
                  </dl>
               </section>

            </div>

            {/* Footer */}
            <footer className="bg-gray-100 px-6 py-4">
               <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <p className="text-slate-600 text-sm font-medium">
                     Need help?{" "}
                     <a
                        href="#"
                        className="text-blue-700 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                     >
                        Contact us
                     </a>
                  </p>

                  <button
                     type="button"
                     className="px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                     aria-label="Download Invoice for order #ORD-78945"
                  >
                     Download Invoice
                  </button>
               </div>
            </footer>

         </div>
      </main>
   );
}