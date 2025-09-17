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
    const [errorMessage, setErrorMessage] = useState("")
    const [sentButton, setSentButton] = useState(true)
    const chatRef = useRef(null)
    useEffect(()=>{
      if(newMessage.length===0) setSentButton(false)
      else setSentButton(true)
    },
    [newMessage])
    const fetchChatMessages = async ()=>{
      try {
        let chat = await axios.get(BASE_URL+"/getChat/"+toUser, {
          withCredentials:true
        })
        const chatMessages = chat?.data?.data?.messages.map((msg)=>{
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
      }
      

    },[message])

    const sendMessage = async(sentButton)=>{
        if(!sentButton) {
          setErrorMessage("Unable to sent empty message")
          const timer = setTimeout(()=>{
            setErrorMessage("")
            
          },3000)
          return ()=>timer
        }
        const socket = createSocketConnection()
        socket.emit("sendMessage",{firstName, fromUserId, toUser, text:newMessage})
        setNewMessage("")
        
    }
  return (
<div className="flex flex-col   m-1 p-1 md:w-screen md:items-center lg:w-screen lg:items-center">


{errorMessage && <div role="alert" className="alert alert-warning">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
  <span>{errorMessage}</span>
</div>}

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
         <button onClick={()=>sendMessage(sentButton)} className="ml-1 btn btn-neutral dark:text-white dark:btn-outline btn-outline">Send</button>

       </div>


  </div>
  </div>
</div>  
)
}

export default Chat


