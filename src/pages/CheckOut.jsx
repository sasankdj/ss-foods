import { useContext, useEffect, useState } from "react";
import { MyContext } from "../context/MyContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
function OrderSidebar() {
   const { Cart } = useContext(MyContext)
   // console.log(Cart);
   const totalPrice = Cart.reduce((total, item) => total + item.quantity * item.product.price, 0)

   return (
      <section className="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px] lg:min-w-[420px]">
         <div className="relative h-full">
            <div className="px-6 py-8 md:overflow-auto md:h-screen">
               {/* Product List */}
               <ul className="space-y-6">
                  {Cart.map((product) => (
                     <li key={product.id} className="flex items-start gap-4">
                        <div className="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                           <img
                              src={product.product.imageUrl}
                              className="w-full object-contain"
                              alt={product.alt}
                           />
                        </div>
                        <div className="w-full">
                           <h3 className="text-sm text-slate-900 font-semibold">
                              {product.product.name}
                           </h3>
                           <ul className="text-sm text-slate-500 font-medium space-y-2 mt-2">
                              <li className="flex flex-wrap gap-4">
                                 Quantity <span className="ml-auto">{product.quantity}</span>
                              </li>
                              <li className="flex flex-wrap gap-4">
                                 Total Price{" "}
                                 <span className="ml-auto text-slate-900 font-semibold">
                                    {product.product.price}
                                 </span>
                              </li>
                           </ul>
                        </div>
                     </li>
                  ))}
               </ul>

               <hr className="border-slate-300 my-6" />



               {/* Order Summary */}
               <div>
                  <ul className="text-slate-500 font-medium space-y-4">
                     <li className="flex flex-wrap gap-4 text-sm">Subtotal <span
                        className="ml-auto text-slate-900 font-semibold">{totalPrice}</span>
                     </li>
                     <li className="flex flex-wrap gap-4 text-sm">Shipping <span
                        className="ml-auto text-slate-900 font-semibold">Free</span>
                     </li>
                     <hr className="border-slate-300" />
                     <li className="flex flex-wrap gap-4 text-sm font-semibold text-slate-900">
                        Total <span className="ml-auto">{totalPrice}</span></li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   );
}

function DeliveryDetailsForm({ paymentMethod, billingAddressSame, setPaymentMethod, setBillingAddressSame, setAddressForm, addressForm, handleSave }) {
   const { navigate } = useContext(MyContext)
   const handleChange = (e) => {
      const { name, value } = e.target;
      setAddressForm((prev) => ({
         ...prev,
         [name]: value,
      }));
   };
   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(addressForm);
      handleSave()
      navigate("/success")

   }
   const { Cart,Token } = useContext(MyContext)

   const totalPrice = Cart.reduce((total, item) => total + item.quantity * item.product.price, 0)
   const [Addresses, setAddresses] = useState([])
   const [Address, setAddress] = useState()
   useEffect(() => {
     fetchAddress();
   }, [])
   
   const fetchAddress=()=>{
      axios.get(`${API_URL}/checkout`,{
         headers:{
            Authorization:`Bearer ${Token}`
         }
      }).then(res=>{setAddress(res.data)
         console.log(res.data);
         
      })
   }
   return (
      <section className="w-full h-max rounded-md py-8 px-8 xl:px-12">
         <div>
            {
               Addresses.map((add)=>(
                  <div>
                    <h1>hi</h1>
                  </div>
               ))
            }
         </div>
         <form onSubmit={handleSubmit}>
            {/* Delivery Details */}
            <fieldset>
               <legend className="text-xl text-slate-900 font-semibold mb-6">
                  Delivery Details
               </legend>
               <div className="grid lg:grid-cols-2 gap-6">
                  <div>
                     <label
                        htmlFor="fullName"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        First Name
                     </label>
                     <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        placeholder="fullName"
                        value={addressForm.fullName}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>

                  <div>
                     <label
                        htmlFor="email"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        Email
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="enter email"
                        value={addressForm.email}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="phoneNumber"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        Mobile Number
                     </label>
                     <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        placeholder="123-456-7890"
                        value={addressForm.phoneNumber}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="address"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        Address Line
                     </label>
                     <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="123 Main Street"
                        value={addressForm.address}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="city"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        City
                     </label>
                     <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="New Delhi"
                        value={addressForm.city}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="state"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        State
                     </label>
                     <input
                        type="text"
                        id="state"
                        name="state"
                        placeholder="Delhi"
                        value={addressForm.state}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
                  <div>
                     <label
                        htmlFor="postal-code"
                        className="mb-2 text-slate-900 font-medium text-sm inline-block"
                     >
                        Postal code
                     </label>
                     <input
                        type="text"
                        id="postal-code"
                        name="pincode"
                        placeholder="10001"
                        value={addressForm.pincode}
                        onChange={handleChange}
                        required
                        className="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600"
                     />
                  </div>
               </div>
            </fieldset>

            {/* Payment Methods */}
            <fieldset className="mt-12">
               <legend className="text-xl text-slate-900 font-semibold mb-6">
                  Payment method
               </legend>
               <div className="grid gap-4 lg:grid-cols-2">
                  {/* Card Payment */}
                  <div className="bg-gray-100 p-4 rounded-md border border-slate-300 max-w-sm">
                     <div>
                        <div className="flex items-center">
                           <input
                              type="radio"
                              name="method"
                              id="card"
                              className="w-[18px] h-[18px] appearance-none rounded-full border border-slate-400 bg-white focus:outline-blue-500 checked:ring-2 checked:ring-inset checked:ring-white checked:bg-blue-600"
                              checked={paymentMethod === "card"}
                              onChange={() => setPaymentMethod("card")}
                           />
                           <label htmlFor="card" className="ml-4 flex gap-2 cursor-pointer">
                              <img
                                 src="https://readymadeui.com/images/visa.webp"
                                 className="w-12"
                                 alt="visa"
                              />
                              <img
                                 src="https://readymadeui.com/images/american-express.webp"
                                 className="w-12"
                                 alt="american-express"
                              />
                              <img
                                 src="https://readymadeui.com/images/master.webp"
                                 className="w-12"
                                 alt="master"
                              />
                           </label>
                        </div>
                     </div>
                     <p className="mt-4 text-sm text-slate-500 font-medium">
                        Pay with your debit or credit card
                     </p>
                  </div>

                  {/* PayPal Payment */}
                  <div className="bg-gray-100 p-4 rounded-md border border-slate-300 max-w-sm">
                     <div>
                        <div className="flex items-center">
                           <input
                              type="radio"
                              name="method"
                              id="paypal"
                              className="w-[18px] h-[18px] appearance-none rounded-full border border-slate-400 bg-white focus:outline-blue-500 checked:ring-2 checked:ring-inset checked:ring-white checked:bg-blue-600"
                              checked={paymentMethod === "paypal"}
                              onChange={() => setPaymentMethod("paypal")}
                           />

                        </div>
                     </div>
                     <p className="mt-4 text-sm text-slate-500 font-medium">
                        Pay with cash on delivery
                     </p>
                  </div>
               </div>
            </fieldset>

            {/* Billing Address Checkbox */}
            <label className="inline-flex items-center group has-[input:checked]:text-slate-900 mt-6">
               <input
                  id="billing-address"
                  name="billing-address"
                  type="checkbox"
                  required
                  className="sr-only"
                  checked={billingAddressSame}
                  onChange={(e) => setBillingAddressSame(e.target.checked)}
               />
               {/* Custom box */}
               <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded outline-1 outline-slate-300 bg-white group-has-[input:checked]:bg-blue-600 group-has-[input:checked]:outline-blue-600 group-focus-within:outline-2 group-focus-within:outline-blue-600" aria-hidden="true">
                  {/* Checkmark  */}
                  <svg className="size-3 text-white opacity-0 group-has-[input:checked]:opacity-100"
                     viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                     <path d="M1 5l3 3 7-7" />
                  </svg>
               </span>
               <span className="ml-3 text-sm text-slate-700">
                  Billing address is the same as shipping address
               </span>
            </label>

            {/* Submit Button */}
            <div className="mt-8">
               <button

                  type="submit"

                  className="w-full px-3.5 py-2 text-white text-sm font-semibold rounded-md cursor-pointer bg-blue-600 hover:bg-blue-700 border border-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
               >
                  Pay {totalPrice}
               </button>
            </div>
         </form>
      </section>
   )
}

export default function CheckOut() {
   const { Token, setOrders } = useContext(MyContext)
   const [paymentMethod, setPaymentMethod] = useState("card");
   const [billingAddressSame, setBillingAddressSame] = useState(true);
   // const [addresses, setAddresses] = useState([]);
   const [addressForm, setAddressForm] = useState({
      fullName: "",
      email: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
   });

   const handleSave = () => {
      checkOut()

   }
   const checkOut = async () => {
      const res = await axios.post(`${API_URL}/checkout`, addressForm, {
         headers: {
            Authorization: `Bearer ${Token}`
         }
      })
      console.log(res.data);
      const r = await axios.post(`${API_URL}/order/place`, {}, {
         headers: {
            Authorization: `Bearer ${Token}`
         }
      })
      console.log(r.data)
      // setOrders(r.data)
   }



   return (
      <main>
         <h1 className="sr-only">Checkout</h1>
         <div className="flex flex-col h-full md:flex-row">
            {/* Sidebar */}
            <OrderSidebar />

            {/* Delivery Details Form */}
            <DeliveryDetailsForm
               handleSave={handleSave}
               paymentMethod={paymentMethod}
               billingAddressSame={billingAddressSame}
               setPaymentMethod={setPaymentMethod}
               setBillingAddressSame={setBillingAddressSame}
               setAddressForm={setAddressForm}
               addressForm={addressForm}
            />
         </div>
      </main>
   );
}