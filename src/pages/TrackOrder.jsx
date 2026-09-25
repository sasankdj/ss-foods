import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MyContext } from '../context/MyContext';
import axios from 'axios';

const products = [
   {
      id: 1,
      name: "Velvet Sneaker",
      qty: 1,
      price: 20.00,
      image: "https://readymadeui.com/images/product14.webp"
   },
   {
      id: 2,
      name: "Smart Watch Timex",
      qty: 1,
      price: 60.00,
      image: "https://readymadeui.com/images/watch5.webp"
   }
];

const steps = [
   {
      title: "Order placed",
      date: "28 Feb 2025, 08:00",
      datetime: "2025-02-28T08:00",
      completed: true,
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.05 4.8c-.6-.6-1.5-.6-2.1 0L8.7 16.05 4.05 11.4c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l5.7 5.7c.3.3.6.45 1.05.45s.75-.15 1.05-.45l12.3-12.3c.6-.6.6-1.5 0-2.1z" />
         </svg>
      )
   },
   {
      title: "Arrived at courier warehouse",
      date: "05 March 2025, 01:10",
      datetime: "2025-03-05T01:10",
      completed: true,
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.05 4.8c-.6-.6-1.5-.6-2.1 0L8.7 16.05 4.05 11.4c-.6-.6-1.5-.6-2.1 0s-.6 1.5 0 2.1l5.7 5.7c.3.3.6.45 1.05.45s.75-.15 1.05-.45l12.3-12.3c.6-.6.6-1.5 0-2.1z" />
         </svg>
      )
   },
   {
      title: "Out for delivery",
      date: "Courier is on the way",
      completed: false,
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] text-slate-900" viewBox="0 0 512 512" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="30">
               <path d="M159.6 400.6h176.733V288.133H15v80.333a32.115 32.115 0 0 0 9.415 22.726 32.122 32.122 0 0 0 22.718 9.407H63.2" />
               <path d="M336.333 288.133v-192.8a32.11 32.11 0 0 0-9.415-22.718A32.13 32.13 0 0 0 304.2 63.2H47.133a32.13 32.13 0 0 0-22.718 9.415A32.11 32.11 0 0 0 15 95.333v192.8h321.333z" />
               <path d="M432.733 400.6h32.133a32.122 32.122 0 0 0 22.718-9.407 32.115 32.115 0 0 0 9.415-22.726V239.934c0-44.36-35.965-80.333-80.333-80.333h-80.333v241" />
               <circle cx="111.4" cy="400.6" r="48.2" />
               <circle cx="384.533" cy="400.6" r="48.2" />
               <path d="M416.667 159.6v128.533H497" />
            </g>
         </svg>
      )
   },
   {
      title: "Expected delivery",
      date: "06 March 2025",
      datetime: "2025-03-06",
      completed: false,
      icon: (
         <svg xmlns="http://www.w3.org/2000/svg" className="size-[18px] fill-slate-900" viewBox="0 0 512 512" aria-hidden="true">
            <path d="M426 495.983H86c-25.364 0-46-20.635-46-46v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 7.72 6.28 14 14 14h340c7.72 0 14-6.28 14-14v-242.02c0-8.836 7.163-16 16-16s16 7.164 16 16v242.02c0 25.364-20.635 46-46 46z" />
            <path d="M496 263.958a15.945 15.945 0 0 1-11.313-4.687L285.698 60.284c-16.375-16.376-43.02-16.376-59.396 0L27.314 259.272c-6.248 6.249-16.379 6.249-22.627 0-6.249-6.248-6.249-16.379 0-22.627L203.675 37.656c28.852-28.852 75.799-28.852 104.65 0l198.988 198.988c6.249 6.249 6.249 16.379 0 22.627A15.943 15.943 0 0 1 496 263.958zM320 495.983H192c-8.837 0-16-7.164-16-16v-142c0-27.57 22.43-50 50-50h60c27.57 0 50 22.43 50 50v142c0 8.836-7.163 16-16 16zm-112-32h96v-126c0-9.925-8.075-18-18-18h-60c-9.925 0-18 8.075-18 18z" />
         </svg>
      )
   }
];

export default function TrackOrder() {
   const {id}= useParams()
   const {Token,setOrder,Order} = useContext(MyContext)
   
   useEffect(() => {
      fetchOrder();
   }, [])
   
   const fetchOrder =async()=>{

      const res = await axios.get(
         `http://localhost:8080/order/getOrder/${id}`,
         {
            headers: {
               Authorization: `Bearer ${Token}`,
            },
         }
      );
      console.log(res.data);
      setOrder(res.data)
      
   }

   return (
      <main className="mt-6 px-4 md:px-8">
         <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="flex items-center gap-6 flex-wrap border-b border-slate-300 pb-6">
               <div className="flex-1 text-nowrap">
                  <h1 className="text-2xl font-bold text-slate-900">
                     Order Tracking
                  </h1>
                  <p className="text-base text-slate-600 mt-4">
                     Tracking Id: <span className="font-medium text-slate-900">{Order.id}</span>
                  </p>
               </div>

              
            </div>

            {/* Timeline Section
            <section className="mt-12 border-b border-slate-300 pb-6" aria-labelledby="tracking-steps-heading">
               <h2 id="tracking-steps-heading" className="sr-only">Tracking steps</h2>
               <ol className="grid min-[400px]:grid-cols-2 md:grid-cols-4 gap-6">
                  {steps.map((step, index) => (
                     <li key={index}>
                        <span className={`flex h-9 w-9 mb-4 items-center justify-center rounded-full ${step.completed ? 'bg-green-500' : 'bg-gray-200 '}`}>
                           {step.icon}
                        </span>
                        <h3 className="mb-2 text-base font-semibold text-slate-900">
                           {step.title}
                        </h3>
                        <p className="text-sm text-slate-600">
                           {step.datetime ? (
                              <time dateTime={step.datetime}>{step.date}</time>
                           ) : (
                              step.date
                           )}
                        </p>
                     </li>
                  ))}
               </ol>
            </section> */}
<h1 className="text-2xl font-bold text-slate-900">Status:{Order.status}</h1>
            {/* Content Section */}
            <div className="mt-12 grid lg:grid-cols-2 gap-12">
               {/* Products List */}
               <section aria-labelledby="products-heading">
                  <div className="border-b border-slate-300 pb-2">
                     <h2 id="products-heading" className="text-base font-semibold text-slate-900">
                        Products
                     </h2>
                  </div>

                  <ul className="space-y-4 mt-6">
                     {Order?.items?.length > 0 ? (Order.items.map((product, index) => (
                        <React.Fragment key={product.product.id}>
                           <li className="grid sm:grid-cols-3 items-center gap-4">
                              <div className="col-span-2 flex items-center gap-4">
                                 <div className="w-20 h-20 shrink-0 bg-gray-100 p-2 rounded-md">
                                    <img src={product.product.imageUrl} className="w-full h-full object-contain" alt={product.name} />
                                 </div>
                                 <div>
                                    <p className="text-sm font-semibold text-slate-900">{product.product.name}</p>
                                    <p className="text-xs text-slate-600 mt-2">Qty: <span className="font-medium">{product.qty}</span></p>
                                 </div>
                              </div>
                              <div className="sm:ml-auto">
                                 <p className="text-sm font-semibold text-slate-900">${product.product.price.toFixed(2)}</p>
                              </div>
                           </li>
                           {index < products.length - 1 && <hr className="border-slate-300" />}
                        </React.Fragment>
                     ))): <h1>No products</h1>
                     }
                  </ul>
               </section>

               {/* Billing Details */}
               <section className="bg-gray-100 rounded-md p-6 h-max" aria-labelledby="billing-heading">
                  <div className="border-b border-slate-300 pb-2">
                     <h2 id="billing-heading" className="text-base font-semibold text-slate-900">
                        Billing details
                     </h2>
                  </div>

                  <ul className="font-medium mt-6 space-y-4" role="list">
                     <li className="flex flex-wrap gap-4 text-slate-600 text-sm">
                        Subtotal
                        <span className="ml-auto text-slate-900 font-semibold">{Order.totalAmount}</span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-slate-600 text-sm">
                        Shipping
                        <span className="ml-auto text-slate-900 font-semibold">Free</span>
                     </li>
                     
                     <hr className="border-slate-300" />
                     <li className="text-sm flex flex-wrap gap-4 text-slate-900 font-semibold">
                        Total
                        <span className="ml-auto">{Order.totalAmount}</span>
                     </li>
                  </ul>
               </section>
            </div>
         </div>
      </main>
   );
};