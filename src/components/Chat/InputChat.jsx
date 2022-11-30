import React,{useContext, useState} from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db, storage} from "../../constants/firebase";
import { e, photo,sendBtn } from '../../assets/index';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { ChatContext } from '../../contexts/ChatContext';

const InputChat = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } =useAuth();
  const { data } = useContext(ChatContext);
  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
    
  };
  
 
  return (
    <div className="input font-poppins">
      <input
       type="text"
       placeholder="Type something..."
       className='placeholder-gray-200 font-medium'
       onChange={(e) => setText(e.target.value)}
       value={text}
      />
     <div className="send p-5">
    
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
          <img src={photo} alt="" />
        </label>
       
        <button onClick={handleSend} >
          <img src={sendBtn} className="w-10 h-24" />
        </button>
      </div>
    </div>
  )
}

export default InputChat
