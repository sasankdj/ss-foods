import axios from "axios";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ProductCard from "./ProductCard";
const API_URL = import.meta.env.VITE_API_URL;
const ProductDetail = () => {
    const { Token,navigate} = useContext(MyContext)
    const { id } = useParams()
    const [Product, setProduct] = useState()
    const [Similar, setSimilar] = useState([])

    
    useEffect(() => {
        
        fetch();

    }, [id])
     useEffect(() => {
        fetchSimilar();

    }, [Product])
    

    const fetch = async () => {

        const res = await axios.get(`${API_URL}/api/product/${id}`, {
            headers: {
                Authorization: `Bearer ${Token}`
            }
        })
        console.log(res.data);
        
        setProduct(res.data)
    }
  const handleAdd=async()=>{

        await axios.post(`${API_URL}/cart/add/${id}`,null,
            {
                headers:{
                      Authorization:`Bearer ${Token}`
                }
            }
        )
        console.log("added to cart");
        toast.success("Product added to cart")
        
    }
   const fetchSimilar=async()=>{
     await axios.get(`${API_URL}/api/products/category`,
            {
                params:{
                    category:Product.category
                },
                headers:{
                      Authorization:`Bearer ${Token}`
                }
            }
        )
        .then(res=>{
            console.log(res.data)
            
            setSimilar(res.data)
        })
   }
const handleBuy=async ()=>{
        await axios.post(`${API_URL}/cart/add/${id}`,null,
            {
                headers:{
                      Authorization:`Bearer ${Token}`
                }
            }
        )
        toast.success("Product added to cart")
        navigate("/cart")
    }
    return Product && (
        <>
        
        <div className="max-w-6xl w-full px-6 mx-auto py-10">
            <p>
                <span>Home</span> /
                <span> Products</span> /
                <span> {Product.category}</span> /
                <span className="text-indigo-500"> {Product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">


                <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                    <img src={Product.imageUrl} alt="Selected Product" className="w-full h-full object-cover" />
                </div>


                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{Product.name}</h1>



                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ₹{Product.price}</p>
                        <p className="text-2xl font-medium">MRP: ₹{Product.price}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {Product.description}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>handleAdd()} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>handleBuy()}  className="w-full py-3.5 cursor-pointer font-medium bg-indigo-500 text-white hover:bg-indigo-600 transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    
   
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            
                .font-poppins {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
            
            <h1 className="text-3xl font-medium text-slate-800 text-center mb-2 font-poppins">Similar Products</h1>
            <p className="text-slate-600 mb-10 font-poppins text-center">People also bought these</p>
            <section className="flex flex-wrap items-center justify-center gap-6">
                {
                    Similar.slice(0,4).map((product)=>(
                        <ProductCard product={product}/>
                    ))
                }
                
            </section>
        </>
    </>
    )
};
export default ProductDetail