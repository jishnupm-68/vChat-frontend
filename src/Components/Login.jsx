import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"
const Login = () => {
  const [emailId, setEmailId] = useState('anandu@gmail.com');
  const [password, setPassword] = useState('Anandu@123');
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async ()=>{
    try {
      const result = await axios.post(BASE_URL+"/login",{
        emailId, password
      },{withCredentials:true})
      console.log("loginresult", result?.data?.status)
      if(!result?.data?.status) return setError(result?.data?.message)
      if(result?.data?.status) dispatch(addUser(result?.data?.data))
      return navigate('/')
      
      
    } catch (error) {
      setError(error?.message)
      console.log("error: ",error)
      
    }
  }
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email</legend>
              <input type="text"
               className="input" 
               placeholder="Type here" 
               value={emailId}
               onChange={(e)=>setEmailId(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" 
              className="input" 
              placeholder="Type here" 
              value={password}
              onChange={(e)=>setPassword(e.target.value)} />
            </fieldset>

          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
