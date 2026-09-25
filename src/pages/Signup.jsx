import axios from "axios"
import { useContext, useState } from "react";
import { MyContext } from "../context/MyContext";
const API_URL = import.meta.env.VITE_API_URL;
const Signup = () => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const {navigate} = useContext(MyContext)
    const handleSubmit=async(e)=>{
        e.preventDefault()
e
        const response= await axios.post(`${API_URL}/auth/signup`,{
            email:Email,
            username:Username,
            password:Password,
            role:"USER"

        })
        console.log(response.data);
        if(response.data.username!=null){
            navigate("/login")
        }
        
    }
    

  return (
    <div className="grid h-screen place-items-center">
        <form onSubmit={handleSubmit} className="bg-white text-gray-500 max-w-[500px] max-h-[500px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-lg shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-2xl font-bold mb-9 text-center text-gray-800">Sign Up</h2>
            <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.125 13.125a4.375 4.375 0 0 1 8.75 0M10 4.375a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input className="w-full outline-none bg-transparent py-2.5" type="text" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)}/>
            </div>
            <div className="flex items-center my-2 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input className="w-full outline-none bg-transparent py-2.5" type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="flex items-center mt-2 mb-8 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <svg width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m2.5 4.375 3.875 2.906c.667.5 1.583.5 2.25 0L12.5 4.375" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.875 3.125h-8.75c-.69 0-1.25.56-1.25 1.25v6.25c0 .69.56 1.25 1.25 1.25h8.75c.69 0 1.25-.56 1.25-1.25v-6.25c0-.69-.56-1.25-1.25-1.25Z" stroke="#6B7280" strokeOpacity=".6" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <input className="w-full outline-none bg-transparent py-2.5" type="password" placeholder="Password" required onChange={(e)=>setPassword(e.target.value)} />
            </div>
            <button className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600 transition-all active:scale-95 py-2.5 rounded text-white font-medium">Create Account</button>
            <p className="text-center mt-4">Already have an account? <a onClick={()=>navigate("/login")} className="text-blue-500 underline">Log In</a></p>
        </form>
        </div>
    );
}

export default Signup