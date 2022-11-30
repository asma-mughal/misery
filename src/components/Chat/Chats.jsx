import { doc, onSnapshot } from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../constants/firebase";
import { useContext } from "react";
import { ChatContext } from "../../contexts/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useAuth()
  const {dispatch, setShow} = useContext(ChatContext)

  useEffect(() => {
 
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
    console.log(Object.entries(chats))
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
    setShow(true)
  };

  return (
    <div className="chats font-poppins">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat "
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p className="text-black">{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;