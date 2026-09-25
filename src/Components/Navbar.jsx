import React, { useContext, useEffect, useState, useRef } from "react";
import { MyContext } from "../context/MyContext";

const Navbar = () => {

  const [open, setOpen] = React.useState(false)
  const [Count, setCount] = useState(0)
    const {navigate,Cart}= useContext(MyContext)
    useEffect(() => {
     setCount(Cart.length);
    }, [Cart])

  const [bump, setBump] = useState(false);
  const prevCount = useRef(Count);
  useEffect(() => {
    if (Cart.length > prevCount.current) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      prevCount.current = Cart.length;
      return () => clearTimeout(t);
    }
    prevCount.current = Cart.length;
  }, [Cart]);

     return (
        <>
        <style>{`
          @keyframes navBump { 0% { transform: scale(1); } 40% { transform: scale(1.35); } 100% { transform: scale(1); } }
          .nav-cart-bump { animation: navBump 350ms ease; }
          .nav-link { position: relative; }
          .nav-link::after {
            content: ""; position: absolute; left: 0; bottom: -2px; height: 2px; width: 0;
            background: #FF7A3D; transition: width 300ms ease;
          }
          .nav-link:hover::after { width: 100%; }
        `}</style>

        <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-[#1D1610]/10 bg-[#FBF7F0]/90 backdrop-blur-md relative transition-all">

            <a onClick={()=>navigate("/")} className="text-2xl font-extrabold tracking-tight text-[#1D1610] cursor-pointer">
              SS Foods
            </a>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-8">
               <a onClick={()=>navigate("/")} className="nav-link block cursor-pointer text-sm font-medium text-[#1D1610]/70 hover:text-[#1D1610] transition-colors">Home</a>
                <a onClick={()=>navigate("/about")} className="nav-link block cursor-pointer text-sm font-medium text-[#1D1610]/70 hover:text-[#1D1610] transition-colors">About</a>
                <a onClick={()=>navigate("/contact")} className="nav-link block cursor-pointer text-sm font-medium text-[#1D1610]/70 hover:text-[#1D1610] transition-colors">Contact</a>
                <a onClick={()=>navigate("/products")} className="nav-link block cursor-pointer text-sm font-medium text-[#1D1610]/70 hover:text-[#1D1610] transition-colors">Products</a>
                <a onClick={()=>navigate("/orders")} className="nav-link block cursor-pointer text-sm font-medium text-[#1D1610]/70 hover:text-[#1D1610] transition-colors">Orders</a>



                <div onClick={()=>navigate("/cart")} className="relative cursor-pointer">
                    <svg width="18" height="18" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#FF7A3D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <button className={`absolute -top-2 -right-3 text-xs text-white bg-[#FF7A3D] w-[18px] h-[18px] rounded-full ${bump ? "nav-cart-bump" : ""}`}>{Count}</button>
                </div>

                <button onClick={()=>navigate("/login")} className="cursor-pointer px-8 py-2 bg-[#1D1610] hover:bg-[#33261C] transition-colors text-[#FBF7F0] rounded-full text-sm font-semibold">
                    Login
                </button>
            </div>

            <button onClick={() => open ? setOpen(false) : setOpen(true)} aria-label="Menu" className="sm:hidden">
                {/* Menu Icon SVG */}
                <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="21" height="1.5" rx=".75" fill="#1D1610" />
                    <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#1D1610" />
                    <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#1D1610" />
                </svg>
            </button>

            {/* Mobile Menu */}
            <div className={`${open ? 'flex' : 'hidden'} absolute top-[60px] left-0 w-full bg-[#FBF7F0]/95 backdrop-blur-md border-b border-[#1D1610]/10 shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}>
               <a onClick={()=>navigate("/")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">Home</a>
                <a onClick={()=>navigate("/about")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">About</a>
                <a onClick={()=>navigate("/contact")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">Contact</a>
                <a onClick={()=>navigate("/products")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">Products</a>
                <a onClick={()=>navigate("/orders")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">Orders</a>
                <a onClick={()=>navigate("/cart")} className="block cursor-pointer text-[#1D1610]/80 hover:text-[#1D1610] transition-colors">Cart</a>


                <button
                onClick={()=>navigate("/login")}
                 className="cursor-pointer px-6 py-2 mt-2 bg-[#1D1610] hover:bg-[#33261C] transition-colors text-[#FBF7F0] rounded-full text-sm font-semibold">
                    Login
                </button>
                 <button
                onClick={()=>navigate("/signup")}
                 className="cursor-pointer px-6 py-2 mt-2 bg-gradient-to-br from-[#FF7A3D] to-[#FFB238] hover:opacity-90 transition-opacity text-white rounded-full text-sm font-semibold">
                    Signup
                </button>
            </div>

        </nav>
       
        </>
    )
}
export default Navbar