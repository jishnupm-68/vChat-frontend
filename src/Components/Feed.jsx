import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'


const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store)=>store?.feed)
  
  const feedData = async()=>{
    const res = await axios.get(BASE_URL + "/feed", {
  withCredentials: true
});
dispatch(addFeed(res?.data?.data))
  }
  try {
    useEffect(()=>{
      feedData()
    },[])
  } catch (error) {
    console.log("Error: ",error.message)
  }
  if(!feed) return;
  if(feed.length<=0) return (<h2 className='flex justify-center  my-14 '>No new users found</h2>)

  
  { 
    const feedUser = feed[0]
  return (
    <div className='flex justify-center my-14 '>
      {feed.length>0 && 
      
         <UserCard key= {feedUser?._id} user={{firstName:feedUser?.firstName, lastName:feedUser?.lastName,  photoUrl:feedUser?.photoUrl, about:feedUser?.about, _id:feedUser?._id}}/>
      }
     
    
    </div>
  )}
}

export default Feed

