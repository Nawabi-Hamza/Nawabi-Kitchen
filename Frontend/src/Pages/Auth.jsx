import React, { useState } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate,Link } from "react-router-dom" 
export default function Auth() {
  return (
    <div>
      <div className="container p-5">
            {Login()}
      </div>
    </div>
  )
}


// Login Section
const Login = ()=>{
  const [ username1,setUsername ] = useState("")
  const [ password1,setPassword ] = useState("")
  const [ ,setCookies ] = useCookies(["access-token"])
   const navigate = useNavigate()
  const handleLogin = async(e)=>{
    e.preventDefault();
    if(username1===""||password1===""){
      alert("Please Fill All Fields...")
    }else{
      try{
        const res = await axios.post("http://localhost:3001/auth/login/",{
          username:username1,
          password:password1
        })
        setCookies("access_token",res.data.token)
        window.localStorage.setItem("userId",res.data.userId)
        navigate("/")
    

      }catch(error){
        console.log(error)
      }
    }

  }
  return <div className="container-fluid py-5">
      <h2>Login</h2>
        <form action=""  className='p-3'>
            <input type="text" className='form-control' onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
            <input type="password" className='form-control my-3' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
            <button className='btn btn-primary' onClick={handleLogin}>Login</button>
            <Link to="/auth/register">
              <button className='btn btn-secondary ms-2'>Register</button>
            </Link>
        </form>
  </div>
}
