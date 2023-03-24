import React, { useState,useEffect } from 'react'
import axios from 'axios'
import GetUserId from '../Hook/userId'

export default function Post() {
  const userId = GetUserId()
  const [ savedPosts,setSavedPosts ] = useState([])


  useEffect(() => {
    const fetchSavedPost = async()=>{
      try{
        const res = await axios.get(`http://localhost:3001/posts/savePosts/${userId}`)
        setSavedPosts(res.data.savePosts)
        // console.log(res.data.savePosts)
      }catch(error){
        console.log(error)
      }
    }


    fetchSavedPost();
  }, [])

   
  
  return (
    <div className='container'>
            <center>
              <h1>Saved Posts</h1>
            </center>
        <div className='row'>
                {savedPosts.map((items)=>(
                  <div key={items._id} className="col-md-6">
                     <div  className="bg-light my-2">
                          <div className='p-4'>
                            <h2>{items.name}</h2>
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
