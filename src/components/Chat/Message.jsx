import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from '../../contexts/AuthContext'
import { ChatContext } from '../../contexts/ChatContext';

const Message = ({message}) => {
  const { currentUser } = useAuth();
  const { data } = useContext(ChatContext);
  const ref = useRef();
  var today = new Date()
  console.log(today.getUTCHours())
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);  
  return (
    <div
    ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}
  >
    <div className="messageInfo">
      <img
        src={
          message.senderId === currentUser.uid
            ? currentUser.photoURL
            : data.user.photoURL
        }
        alt=""
      />
      <span>just now</span>
    </div>
    <div className="messageContent">
      <p>{message.text}</p>
      {message.img && <img src={message.img} alt="" />}
    </div>
  </div>
  )
}

export default Message
