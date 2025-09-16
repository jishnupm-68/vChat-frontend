import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";


const Chat = () => {
    const {toUser } = useParams();
    const user = useSelector(store=>store.user)
    const fromUserId = user?._id
    const firstName = user?.firstName
    const [message, setMessage] = useState([])
    const [newMessage, setNewMessage] =useState("")
    
    useEffect(()=>{
        if(!fromUserId) return
        const socket = createSocketConnection()
        socket.emit("joinChat", { firstName, fromUserId,toUser})
        socket.on("messageReceived",({firstName, text})=>{
            setMessage(prev => [...prev, { firstName, text }]);

        })
        return ()=>{
            socket.disconnect();
        }
    },[toUser, fromUserId])

    const sendMessage = async()=>{
        const socket = createSocketConnection()
        socket.emit("sendMessage",{firstName, fromUserId, toUser, text:newMessage})
        setNewMessage("")
    }
  return (
    <div className="m-2 border border-amber-600" >
      

   <div className="border border-blue-800 sm:h-96 lg:w-3xl lg:flex lg:justify-center md:h-96 ">
       {message.map((item, index)=>( 
        <div key={index} className="chat chat-start ">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full"> 
      {/* <img
        alt="user image"
        src={user?.photoUrl}
      /> */}
    </div>
  </div>
  <div className="chat-header">
    {item.firstName}
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">{item.text}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>
      ))}
   </div>

      <div className="flex p-1  ">

        <input type="text" placeholder="Type here" className="input" value={newMessage}
        onChange={(e)=>setNewMessage(e.target.value)} /> 
        <button onClick={sendMessage} className="ml-1 btn btn-neutral dark:text-white dark:btn-outline btn-outline">Send</button>

      </div>
      


    </div>
  )
}

export default Chat
