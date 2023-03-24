import React, { useState } from 'react'
import axios from "axios"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom" 
export default function Auth() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            {Login()}
          </div>
          <div className="col-md-6">
            {Register()}
          </div>
        </div>
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
        // document.getElementById("show").innerHTML=res.data.message;
        // document.getElementById("show").style="display:block;";
        // setTimeout(()=>{
        //   document.getElementById("show").innerHTML="";
        //   document.getElementById("show").style="display:none;";
        // },4000)

      }catch(error){
        console.log(error)
      }
    }

  }
  return <div className="container-fluid py-5">
    <div className='alert alert-success' id='show' style={{display:"none"}}></div>
      <h2>Login</h2>
        <form action=""  className='p-3'>
            <input type="text" className='form-control' onChange={(e)=>setUsername(e.target.value)} placeholder='Username' />
            <input type="password" className='form-control my-3' onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
            <button className='btn btn-primary' onClick={handleLogin}>Login</button>
        </form>
  </div>
}

const Register = ()=>{
  const [ username1,setUsername ] = useState("")
  const [ email1,setEmail ] = useState("")
  const [ phone1,setPhone ] = useState("")
  const [ age1,setAge ] = useState("")
  const [ password1,setPassword ] = useState("")
  const handleRegister = async(e)=>{
    e.preventDefault();
    if(username1===""||email1===""||phone1===""||age1===""||password1===""){
      alert("Please Fill All Fields..")
    }else{
      try{
       const res = await axios.post("http://localhost:3001/auth/register/",{
          username:username1,
          email:email1,
          phone:phone1,
          age:age1,
          password:password1
        })
        document.getElementById("show").innerHTML=res.data.message;
        document.getElementById("show").style="display:block;";
        setTimeout(()=>{
          document.getElementById("show").innerHTML="";
          document.getElementById("show").style="display:none;";
        },4000)
        // console.log(res.data.message)
        // alert("User Registerd")
      }catch(error){
        console.log(error)
      }
    }
  } 
  return <div className="container-fluid py-5">
    <div className='alert alert-success' id='show' style={{display:"none"}}></div>
    <h2>Register</h2>
    <form action=""  className='p-3'>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} className='form-control' placeholder='Username' />
            <input type="text" onChange={(e)=>setEmail(e.target.value)}  className='form-control my-3' placeholder='Email' />
            <input type="text" onChange={(e)=>setPhone(e.target.value)}  className='form-control' placeholder='Phone' />
            <input type="Number" onChange={(e)=>setAge(e.target.value)}  className='form-control my-3' placeholder='Age' />
            <input type="password" onChange={(e)=>setPassword(e.target.value)}  className='form-control ' placeholder='Password' />
            <button className='btn btn-primary mt-3' onClick={handleRegister}>Register</button>
        </form>
  </div>
}