import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const EditProfile = (user) => {
     const [firstName, setFirstName] = useState(user?.user?.firstName ? user?.user?.firstName :"");
     const [lastName, setLastName] = useState(user?.user?.lastName ? user?.user?.lastName: "");
     const [age, setAge] = useState(user?.user?.age ? user?.user?.age : "");
     const [gender, setGender] = useState( user?.user?.gender ? user?.user?.gender :"");
     const [about, setAbout] = useState(user?.user?.about ? user?.user?.about: "")
     const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl ? user?.user?.photoUrl : "")
     const [error, setError] = useState("") 
     const [showToast, setShowToast] = useState(false);
     const [message, setMessage] =useState("")

     const dispatch = useDispatch()
     const handleSave =async()=>{
      try {
        setError("")
        const res = await axios.patch(BASE_URL+"/profile/edit",
          {firstName,
            lastName, 
            photoUrl,
            age, 
            gender, 
            about
          },
          {withCredentials:true}
        )
        dispatch(addUser(res?.data?.data))
        setShowToast(true);
        setMessage(res?.data?.message)
        setTimeout(()=>{
          setShowToast(false)
        },3000)
      } catch (error) {
        console.log(error)
        setError(error?.response?.data?.message)
        setMessage("")
      }
     }
  return (
    // <div className="flex  justify-center  my-10 ">
    <div className="flex flex-col sm:flex-row justify-center my-10 gap-4">

      {user && (
        <div className="mx-10">
          <div className="card card-border bg-base-300 lg:w-96 ">
            {showToast && (
              <div className="toast toast-top toast-end my-10">
                <div className="alert alert-success">
                  <span>{message}</span>
                </div>
              </div>
            )}

            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Age</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Gender</legend>

                  <details className="dropdown">
                    <summary className="btn m-1">
                      {gender ? gender : "Select gender"}
                    </summary>
                    <ul className=" cursor-pointer menu dropdown-content bg-base-100 rounded-box z-1 w-28  p-2 shadow-sm">
                      <li
                        onClick={() => setGender("male")}
                        className="p-1 hover:bg-base-300"
                      >
                        male
                      </li>
                      <li
                        onClick={() => setGender("female")}
                        className="p-1 hover:bg-base-300"
                      >
                        female
                      </li>
                    </ul>
                  </details>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Your bio</legend>
                  <textarea
                    className="textarea h-24"
                    placeholder="About"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  ></textarea>
                  <div className="label">Optional</div>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Photourl</legend>
                  <input
                    type="text"
                    className="input"
                    placeholder="Type here"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-500">{error}</p>
              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div >
        <UserCard
          user={{ firstName, lastName, about, photoUrl, age, gender }}
        />
      </div>
    </div>
  );
}

export default EditProfile
