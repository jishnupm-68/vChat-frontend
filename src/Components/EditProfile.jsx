import React, { useState } from 'react'


const EditProfile = (user) => {
    console.log("edit user", user)
     const [firstName, setFirstName] = useState(user?.user?.firstName);
     const [lastName, setLastName] = useState(user?.user?.lastName);
     const [age, setAge] = useState(user?.user?.age);
     const [gender, setGender] = useState(user?.user?.gender);
     const [about, setAbout] = useState(user?.user?.about)
     const [photoUrl, setPhotoUrl] = useState(user?.user?.photoUrl)
     const [error, setError] = useState("")
      
      const handleSave =()=>{}
  return (
    <div>
        {user && <div className='flex justify-center my-10'>
      <div className="card card-border bg-base-300 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Edit Profile</h2>
          <div>
            <fieldset className="fieldset">
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
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Age</legend>
              <input type="text"
               className="input" 
               placeholder="Type here" 
               value={age}
               onChange={(e)=>setAge(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Gender</legend>
              <input type="text" 
              className="input" 
              placeholder="Type here" 
              value={gender}
              onChange={(e)=>setGender(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input type="text" 
                className="input" 
                placeholder="Type here" 
                value={about}
                onChange={(e)=>setAbout(e.target.value)} />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Photourl</legend>
              <input type="text" 
              className="input" 
              placeholder="Type here" 
              value={photoUrl}
              onChange={(e)=>setPhotoUrl(e.target.value)} />
            </fieldset>

          </div>
          <p className='text-red-500'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    </div>}
    </div>
  )
}

export default EditProfile
