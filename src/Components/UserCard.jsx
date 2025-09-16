import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"


const UserCard = (props) => {
  const dispatch = useDispatch()
  const handleSendRequest = async (status,userId)=>{
    try {
      const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},
        {withCredentials:true}
      )
      dispatch(removeUserFromFeed(userId))
      
    } catch (error) {
      console.log("error: ", error)
    }
  }
const {firstName,lastName, photoUrl,about, age, gender, _id} = props?.user
  return (
    <div className="card bg-base-300 lg:w-96 shadow-sm mx-10 ls:mx-1 p-4 ls:p-1">
  <figure>
    <img className="lg:w-96 sm:w-56 "
      src={photoUrl}
      alt="User" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2> 
    {age && <p>{age}</p>} {gender&&<p>{gender}</p>}
    <p>{about}</p>
    <div className="card-actions justify-end">
      <button className="btn btn-soft btn-warning" onClick={()=>handleSendRequest("ignored", _id)}>Ignore</button>
      <button className="btn btn-soft btn-success" onClick={()=>handleSendRequest("interested", _id)}>Interested</button>
    </div>
  </div>
</div>
  );
}

export default UserCard
