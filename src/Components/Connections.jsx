import axios from 'axios';
import  { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionsSlice';

const Connections = () => {
    const dispatch  = useDispatch()
    const connections = useSelector((store)=>store?.connections)

    const fetchConnection = async()=>{
        try {
            const res = await axios.get(BASE_URL+"/user/connections",{
                withCredentials:true
            })
            dispatch(addConnection(res?.data?.data))
        } catch (error) {
            console.log(error);
        }
        
    }
    useEffect(()=>{
            fetchConnection()
        },[]
    )
    if(!connections) return <><h1>No connections found</h1></>
     if(connections.length===0) return <><h1>No connections found</h1></>
    
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
        
      </tr>
    </thead>
    <tbody>


      {/* row 1 */}

       {connections.map((item)=>(
    
      <tr key = {item?._id}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img
                  src={item?.photoUrl}
                  alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{item?.firstName +" "+item?.lastName}</div>
            </div>
          </div>
        </td>
        <td>
          {"About :"+ item?.about }
          <br />
          {"Skills: "+ item?.skills.join(", ")}
          
        </td>
       
      </tr>

  ))}
      
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

export default Connections
