import { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

export default function RegisterPage() {
  return (
    <div className='container p-5'>{Register()}</div>
  )
}



const Register = ()=>{
    const [ username1,setUsername ] = useState("")
    const [ email1,setEmail ] = useState("")
    const [ phone1,setPhone ] = useState("")
    const [ age1,setAge ] = useState("")
    const [ password1,setPassword ] = useState("")
    const navigate = useNavigate()
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
          navigate("/auth")
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
              <div className='mt-3'>
              <button className='btn btn-primary ' onClick={handleRegister}>Register</button>
              <Link to="/auth">
              <button className='btn btn-secondary ms-2'>Login</button>
            </Link>
              </div>
          </form>
    </div>
  }