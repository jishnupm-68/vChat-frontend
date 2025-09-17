import {  Outlet, useNavigate } from "react-router-dom"
import Header from "./Header"
import axios from "axios"
import  {BASE_URL}  from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

const Body = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const userDataRedux = useSelector((store)=>store?.user)
  
  const fetchUser = async()=>{
    try {
      if(userDataRedux) return
      const result = await axios.get(BASE_URL+"/profile/view",{withCredentials:true})
      dispatch(addUser(result?.data?.data))
    } catch (error) {
      Navigate("/login")
      // console.log("Error: ",error.message)
    }
  }
  useEffect(()=>{
    fetchUser()
  },[])

  

  return (
    <div className="pb-20">
      <Header />
      <Outlet />
    </div>
  )
}

export default Body
