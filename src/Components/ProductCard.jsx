import axios from "axios";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
export default function ProductCard({product}) {
    // console.log(product);
    
    const {Token,navigate,setCart}= useContext(MyContext)
    // console.log(Token);
    
    const handleAdd=async()=>{
      
        await axios.post(`${API_URL}/cart/add/${product.id}`,null,
            {
                headers:{
                      Authorization:`Bearer ${Token}`
                }
            }
        ).then(res=>{

            setCart(prev=>[...prev,res.data])
        })
        toast.success("Product added to cart")
        console.log("added to cart");
    }
    const handleBuy=async ()=>{
        await axios.post(`${API_URL}/cart/add/${product.id}`,null,
            {
                headers:{
                      Authorization:`Bearer ${Token}`
                }
            }
        )
        toast.success("Product added to cart")
        navigate("/cart")
    }
    const handleClick=()=>{
        navigate(`/product/${product.id}`)
    }
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <div className="flex flex-col bg-white shadow-md w-72">
                <img  onClick={()=>{handleClick()}} className='w-72 h-48 object-cover'
                    src={product.imageUrl}
                    alt="image" />
                <div className="p-4 text-sm">
                    <p className="text-slate-600">₹{product.price}</p>
                    <p className="text-slate-800 text-base font-medium my-1.5">{product.name} ({product.stock})</p>
                    <p className="text-slate-500">{product.description}</p>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                        <button onClick={()=>handleAdd()} className="bg-slate-100 text-slate-600 py-2">
                            Add to cart
                        </button>
                        <button onClick={()=>{handleBuy()}} className="bg-slate-800 text-white py-2">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};