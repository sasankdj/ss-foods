import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { MyContext } from '../context/MyContext';




export default function Categories() {
   const [getCategories, setCategories] = useState([])
   const {Token,navigate} = useContext(MyContext)
   const fetchCategories=()=>{
      axios.get("http://localhost:8080/api/products/getcategories",{
         headers:{
            Authorization:`Bearer ${Token}`
         }
      }).then(res=>{
         setCategories(res.data)
         console.log(res.data);
         
      })
   }
   
   useEffect(() => {
      fetchCategories();
   }, [])

   return (
      <section className="mt-6 px-4 md:px-8" aria-labelledby="category-heading">
         <div className="max-w-7xl mx-auto">
            <h2
               id="category-heading"
               className="text-2xl font-bold text-slate-900 mb-8"
            >
               Top Categories
            </h2>

            <ul className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
               {getCategories.map((category,id) => (
                  <li key={id}>
                     <a
                        onClick={()=>navigate(`/products/${category.category}`)}
                        className="block bg-gray-50 p-3 rounded-md border border-slate-300 shadow-sm overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all hover:shadow-md"
                     >
                        <div className="aspect-square rounded-full overflow-hidden mx-auto">
                           <img
                              src={category.imageUrl}
                              alt={category.category}
                              className="h-full w-full object-cover object-top"
                           />
                        </div>

                        <div className="mt-4 text-center">
                           <h3 className="text-slate-900 text-sm font-semibold">
                              {category.category}
                           </h3>
                          
                        </div>
                     </a>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};