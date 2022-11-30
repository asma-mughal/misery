import React, {useState, useContext, useEffect} from 'react'
import Message from './Message';
import { ChatContext } from '../../contexts/ChatContext';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../constants/firebase";
const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (

    <div className="messages bg-white overflow-auto">
    {messages.map((m) => (
      <Message message={m} key={m.id} />
    ))}
  </div>
  )
}

export default Messages
