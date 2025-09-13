import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";


const Request = () => {
    const dispatch =useDispatch();
    const requests = useSelector((store)=>store?.request)
    const reviewRequest = async(status, _id)=>{

        try {
             const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{}
                ,{withCredentials:true}
            )
            dispatch(removeRequest(_id))
            
        } catch (error) {
            console.log("error: ", error)
        }
    }
    const fetchRequests = async()=>{
        try {
            const res = await axios.get(BASE_URL+"/user/requests/received",
                {withCredentials:true}
            )
            dispatch(addRequest(res?.data?.data))
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchRequests()
    },[])
   if(!requests) return <><h1>No Request found</h1></>
     if(requests.length===0) return <><h1>No Request found</h1></>
    
  return (
    <div>
    <div>
        <h1 className='font-bold text-3xl text-center'>Connections</h1>
    </div>
   <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Details</th>
        <th>Actions</th>
        
      </tr>
    </thead>
    <tbody>


      {/* row 1 */}

       {requests.map((item)=>{
        const {firstName, lastName, photoUrl, about, age , gender, _id}= item?.fromUserId
      return(<tr key = {_id}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={photoUrl}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{firstName +" "+lastName}</div>
            </div>
          </div>
        </td>
        <td>
          {"About :"+about }
          <br />
         
          
        </td>
        <td>
            <div >
                <button className="btn btn-soft btn-error mr-2" onClick={()=>reviewRequest("rejected", item?._id)}>Reject</button>
                <button className="btn btn-soft btn-success" onClick={()=>reviewRequest("accepted",item?._id)}>Accept</button>
            </div>
        </td>
       
      </tr>
    )}
    )}
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th>Name</th>
        <th>Details</th>
        
      </tr>
    </tfoot>
  </table>
</div>
    </div>
  )

}

export default Request
