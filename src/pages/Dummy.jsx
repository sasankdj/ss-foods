import { useContext, useEffect } from "react"
import { MyContext } from "../context/MyContext"
import axios from "axios"


const Dummy = () => {
    // const token = localStorage.getItem("token")
    const {Token,setUsers,Users} = useContext(MyContext)
    // const [Users, setUsers] = useState([])

    useEffect(() => {
      const fetch = async()=>{

          const res=  await axios.get("http://localhost:8080/auth/user")
          setUsers(res.data);
          console.log(res.data);
          
      }
      fetch();
    }, [])
    
  return (
    <div>
        {/* <h2>{token}</h2>
        <h3>{Token}</h3> */}
        {
            Users.map((u)=>(
                <div key={u.id}>
                    <h1>username: {u.username}</h1>
                    <p>password: {u.email}</p>
                </div>
            ))
        }
    </div>
  )
}

export default Dummy