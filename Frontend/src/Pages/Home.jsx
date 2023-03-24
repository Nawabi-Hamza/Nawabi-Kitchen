import React, { useState,useEffect } from 'react'
import axios from 'axios'
import GetUserId from '../Hook/userId'

export default function Home() {
  const userId = GetUserId()

  const [ posts,setPosts ] = useState([])
  const [ savePosts,setSavePosts ] = useState([])


  useEffect(() => {
    const  fetchPost = async()=>{
      try{
        const res = await axios.get("http://localhost:3001/posts")
        setPosts(res.data)
        // console.log(res.data)
      }catch(error){
        console.log(error)
      }
    }


    const fetchSavedPost = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/posts/savePosts/ids/${userId}`)
        setSavePosts(res.data.savedPosts)
        // console.log(res.data.savedPosts)
      }catch(error){
        console.log(error)
      }
    }


    fetchPost();
    fetchSavedPost();
  }, [userId])

    const savePost = async(postId)=>{
      try{
         await axios.put("http://localhost:3001/posts/",{
          postId,
          userId
        })
      //  console.log(response)
      }catch(error){
        console.log(error)
      }
    }

  
  return (
    <div className='container'>
            <center>
              <h1>Posts</h1>
            </center>
        <div className='row'>
                {posts.map((items)=>(
                  <div key={items._id} className="col-md-6">
                     <div  className="bg-light my-2">
                          <div className='p-4'>
                            <h2>{items.name}</h2>
                            {userId?
                            <button className='btn btn-primary mb-3' onClick={()=> savePost(items._id)} disabled={savePosts.includes(items._id)}>{savePosts.includes(items._id)?<span>Saved Post</span>:<span>Save</span>}</button>
                            :null}
                            
                            <div>
                              What You Need ?
                              <ul key={items.ingredients}>
                                {items.ingredients.map((sh,index)=>(
                                  <li key={index}>{sh}</li>
                                  ))}
                              </ul>
                            </div>
                            <img src={items.imageUrl} style={{width:"100%",height:"200px",objectFit:"cover"}} alt="" />
                            <p>{items.instractions}</p>
                          </div>
                        </div>
                  </div>
                ))}
        </div>
    </div>
  )
}
