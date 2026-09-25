import { useEffect, useState } from "react"
import { MyContext } from "./MyContext"
import { useNavigate } from "react-router-dom"

const MyContextProvider = ({children}) => {
    const [Token, setToken] = useState(localStorage.getItem("token")||"")
    // const [Token, setToken] = useState("")

    const [Users, setUsers] = useState([])
    const [Products, setProducts] = useState([])
    const [LoggedIn, setLoggedIn] = useState(localStorage.getItem("loggedIn"))
    const [Cart, setCart] = useState([])
    const [TotalItems, setTotalItems] = useState(0)
    const [PaymentMethod, setPaymentMethod] = useState("Online")
    const [Addresses, setAddresses] = useState([])
    const [TotalPrice, setTotalPrice] = useState(0)
    const [Role, setRole] = useState("")
    const [Order, setOrder] = useState({})

    const navigate = useNavigate()
    useEffect(() => {
     
     
      setRole(localStorage.getItem("role"))
      setToken(localStorage.getItem("token"))
    }, [])
    
  return (
   
    <MyContext.Provider value={{setToken,Token,Users,setUsers,navigate,setProducts,
    Products,LoggedIn,setLoggedIn,Cart,setCart,TotalItems,setTotalItems
    ,PaymentMethod,setPaymentMethod,setAddresses,Addresses,TotalPrice,setTotalPrice,
    Role,setRole,Order,setOrder}}>
        {children}
    </MyContext.Provider>
   
  )
}
export default MyContextProvider