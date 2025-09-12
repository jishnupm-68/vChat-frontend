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
dispatch(addFeed(res?.data))
  }
  try {
    useEffect(()=>{
      feedData()
    },[])
  } catch (error) {
    console.log("Error: ",error.message)
  }
  return (
    <div className='flex justify-center my-14'>
      {feed && 
          feed?.data.map((feedUser)=><UserCard key= {feedUser?._id} user={{firstName:feedUser?.firstName, lastName:feedUser?.lastName,  photoUrl:feedUser?.photoUrl, about:feedUser?.about}}/>)
      }
     
    
    </div>
  )
}

export default Feed

