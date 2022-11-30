import React, { useContext } from "react";

import Messages from "./Messages";
import InputChat from "./InputChat";
import { ChatContext } from "../../contexts/ChatContext";
const Chat = () => {
  const {data } = useContext(ChatContext)
  return (
    <div className="chat font-poppins ">
      <div className="chatInfo">
      <span className="text-black font-bold">{data.user?.displayName}</span>
        <div className="chatIcons">
          
        </div>
      </div>
      <Messages />
      <InputChat />
    </div>
  );
};
export default Chat;