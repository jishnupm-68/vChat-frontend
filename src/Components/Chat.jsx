import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import axios from "axios";
import { BASE_URL } from "../utils/constants";


const Chat = () => {
    const {toUser } = useParams();
    const user = useSelector(store=>store.user)
    const fromUserId = user?._id
    const firstName = user?.firstName
    const [message, setMessage] = useState([])
    const [newMessage, setNewMessage] =useState("")
    const chatRef = useRef(null)
    const fetchChatMessages = async ()=>{
      try {
        let chat = await axios.get(BASE_URL+"/getChat/"+toUser, {
          withCredentials:true
        })
        const chatMessages = chat?.data?.data?.messages.map((msg)=>{console.log(msg)
          const date = new Date(msg?.createdAt);
          return {firstName:msg?.senderId?.firstName,time: date.toLocaleString("in"), lastName:msg?.lastName,photoUrl:msg?.senderId?.photoUrl, text:msg?.text}
        })

        setMessage(chatMessages)
      } catch (error) {
        console.log("Error: ", error)
      }
    }
    useEffect(()=>{
      fetchChatMessages()
    },[])
    useEffect(()=>{
        if(!fromUserId) return
        const socket = createSocketConnection()
        socket.emit("joinChat", { firstName, fromUserId,toUser})
        socket.on("messageReceived",({firstName, text, time, photoUrl})=>{   
            setMessage(prev => [...prev, { firstName, text, time , photoUrl}]);
                          
        })
        return ()=>{
            socket.disconnect();
        }
    },[toUser, fromUserId])

    useEffect(()=>{
       if(chatRef.current){
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
        console.log("updated message", message)
      }
      

    },[message])

    const sendMessage = async()=>{
        const socket = createSocketConnection()
        socket.emit("sendMessage",{firstName, fromUserId, toUser, text:newMessage})
        setNewMessage("")
    }
  return (
<div className="flex flex-col   m-1 p-1 md:w-screen md:items-center lg:w-screen lg:items-center">
  <div className="flex flex-col lg:justify-center  md:w-1/2 lg:w-1/2 dark:bg-gray-800 ">
    <div className=" m-1 p-1  shadow border-amber-50 ">
      Chat 
  </div>
  <div className=" m-1 p-1 h-72 overflow-y-auto" ref={chatRef}>
     {
    message.map((item, index)=>

       <div key={index} className={"chat "+ (firstName===item?.firstName?"chat-start":'chat-end')}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="user image"
        src={(firstName===item?.firstName?user?.photoUrl:item?.photoUrl)}
      />
     
    </div>
  </div>
  <div className="chat-header">
   {item?.firstName}
    <time className="text-xs opacity-50">{item?.time}</time>
  </div>
  <div className="chat-bubble">{item?.text}</div>
  {/* <div className="chat-footer opacity-50">Delivered</div> */}
</div>

    )
   }
  

  </div>
  <div className=" m-1 p-1">

   <div className="flex p-1 shadow border-amber-50   ">

         <input type="text" placeholder="Type here" className="input" value={newMessage}
         onChange={(e)=>setNewMessage(e.target.value)} /> 
         <button onClick={sendMessage} className="ml-1 btn btn-neutral dark:text-white dark:btn-outline btn-outline">Send</button>

       </div>


  </div>
  </div>
</div>  
)
}

export default Chat


