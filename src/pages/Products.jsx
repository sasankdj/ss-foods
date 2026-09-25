import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { MyContext } from '../context/MyContext'
import ProductCard from '../Components/ProductCard'
import Categories from '../Components/Categories'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;
const Products = () => {
    const { Token, Products, setProducts, navigate } = useContext(MyContext)
    const [Search, setSearch] = useState("");
    // console.log(Token);

    const { category } = useParams();
    useEffect(() => {



        const fetchCat = async () => {

            // if(!category) return

            const url = category ? `${API_URL}/api/products/category` : `${API_URL}/api/products`;

            await axios.get(url, {
                params: {
                    category: category
                },
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
                .then(res => {

                    setProducts(res.data)
                    console.log(res.data);
                })

        }
        fetchCat()

    }, [Token, category])

    // useEffect(() => {
    //      if (Token=="") {
    //     navigate("/login")
    // }
    //     const fetch =async ()=>{

    //        const res= await axios.get("http://localhost:8080/api/products",{
    //         headers:{
    //             Authorization:`Bearer ${Token}`
    //         }
    //        })
    //         setProducts(res.data)
    //         console.log(Products);

    //     }
    //     fetch()
    // }, [])

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);
        return () => clearTimeout(timer)
    }, [Search])
    const fetchProducts = async () => {
        await axios.get(`${API_URL}/api/products/search`,
            {
                params: {
                    name: Search
                },
                headers: {
                    Authorization: `Bearer ${Token}`
                }
            })
            .then(res => {
                setProducts(res.data);
            })
    }
    const  fetchSortedProducts=async (field,dir)=>{
        await axios.get(
        `${API_URL}/api/products/sort`,
        {
            params: {
                category:category,
                sortBy: field,
                direction: dir
            },
            headers: {
                Authorization: `Bearer ${Token}`
            }
        }
    ).then(res=>{
        setProducts(res.data)
    })
    }

    return (
        <>
            <div className='flex '>

                <div className="w-full sm:w-80 md:w-96 mx-0 sm:mx-0 my-2 flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
    <input
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
        className="py-2 w-full bg-transparent outline-none placeholder-gray-500"
        type="text"
        placeholder="Search products"
    />

    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
    >
        <path
            d="M10.836 10.615 15 14.695"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            clipRule="evenodd"
            d="M9.141 11.738c2.729-1.136 4.001-4.224 2.841-6.898S7.67.921 4.942 2.057C2.211 3.193.94 6.281 2.1 8.955s4.312 3.92 7.041 2.783"
            stroke="#7A7B7D"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
</div>
                <select
                    onChange={(e) => {
                        const [field, dir] = e.target.value.split(",");
                        fetchSortedProducts(field, dir);
                    }}
                >
                    <option value="">Sort By</option>
                    <option value="price,asc">Price: Low to High</option>
                    <option value="price,desc">Price: High to Low</option>
                    <option value="name,asc">Name: A-Z</option>
                    <option value="name,desc">Name: Z-A</option>
                </select>
            </div>
            {
                category == null ? <div>

                    <Categories></Categories>
                </div> : <h2
                    id="category-heading"
                    className="mx-15 text-2xl font-bold text-slate-900 mb-8"
                >
                    {category}
                </h2>
            }
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6'>
                {
                    Products.map((p) => (
                        <ProductCard key={p.id} product={p}></ProductCard>
                    ))
                }
            </div>
        </>
    )
}

export default Products