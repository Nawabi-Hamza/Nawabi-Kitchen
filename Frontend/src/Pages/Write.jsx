import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import GetUserId from '../Hook/userId';

export default function Write() {
  // We Get Userid From Local Storege
  const  userId = GetUserId()
  const navigate = useNavigate()
  // By This we made all fields
  const [ post,setPost ] = useState({
    title:"",
    ingredients:[],
    instractions:"",
    imageUrl:"",
    userOwner:userId,
  });
  // By this we get data very easy by names and this take data 
  const handleChange = (e) =>{
    const { name,value } = e.target;
    setPost({...post,[name]:value})
  }
  // By This we can add multiple inputs and that saved in an array 
  const handleIngredientChange =(event,idx)=>{
    const { value } =  event.target;
    const ingredients = post.ingredients;
    ingredients[idx] = value;
    setPost({...post,ingredients})
    
  }
  const addIngredients = ()=>{
    setPost({...post,ingredients:[...post.ingredients,""]})
  }
  // console.log(post)

  //  By This we can send data to database
    const onSubmit = async(e)=>{
      e.preventDefault()
      try{
         await axios.post("http://localhost:3001/posts/",post)
        // console.log(res.data)
        alert("Your Post Created Successfuly...")
        navigate("/")
      }catch(error){
        console.log(error)
      }
    }

  return (
    <div className='container py-5'> 
    <h2>Create Posts</h2>
    <form action="" className='p-3'>
    <input type="text" className='form-control' placeholder='Title' name='title' onChange={handleChange} />
    {post.ingredients.map((ingredient,idx)=>(
      <input type="text" key={idx} className='form-control my-3' value={ingredient}  placeholder='ingredients' name='ingredients' onChange={(e)=> handleIngredientChange(e,idx)} />
    ))}
    <button className='btn btn-secondary form-control my-3' onClick={addIngredients} type="button">Add Ingredients</button>

    <input type="text" className='form-control' placeholder='instractions' name='instractions' onChange={handleChange} />
    <input type="text" className='form-control my-3' placeholder='imageUrl' name='imageUrl' onChange={handleChange} />
    <button className='btn btn-primary' onClick={onSubmit} type="submit">Post</button>
  </form> 
  </div>
  )
}
