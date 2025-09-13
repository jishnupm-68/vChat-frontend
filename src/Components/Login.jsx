import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import {BASE_URL} from "../utils/constants"

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [error, setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = async ()=>{
    try {
      const result = await axios.post(BASE_URL+"/login",{
        emailId, password
      },{withCredentials:true})
      if(!result?.data?.status) return setError(result?.data?.message)
      if(result?.data?.status) dispatch(addUser(result?.data?.data))
      return navigate('/')
    } catch (error) {
      setError(error?.message)
      console.log("error: ",error)
    }
  }

  const handleSignup = async()=>{
      try {
        const res = await axios.post(BASE_URL+"/signup",
          {firstName, lastName, emailId, password},
          {withCredentials:true}
        )
        if(!res?.data?.status) return setError(res?.data?.message)
        if(res?.data?.status) dispatch(addUser(res?.data?.data))
        return navigate("/profile")
      } catch (error) {
        console.log("error: ", error.message)
      }
    }
  return (
    <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm?"Login":"Signup"}</h2>
          <div>

          
           { !isLoginForm &&  (
            <><fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text"
               className="input" 
               placeholder="Type here" 
               value={firstName}
               onChange={(e)=>setFirstName(e.target.value)} />
            </fieldset>


<fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text"
               className="input" 
               placeholder="Type here" 
               value={lastName}
               onChange={(e)=>setLastName(e.target.value)} />
            </fieldset>
            </>
            )}
          



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
            <button className="btn btn-primary" 
            onClick={()=>{isLoginForm?handleLogin() : handleSignup()}}>
              {isLoginForm? "Login":"Signup"}</button>
          </div>
          <div  className='text-center '>
            <p className='text-indigo-700 cursor-pointer' onClick={()=>setIsLoginForm(!isLoginForm)}>{isLoginForm?
            "Not a member? Signup here":
            "Already a member? Login here"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
