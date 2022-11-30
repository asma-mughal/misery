import React,{useState} from 'react'
import { useAuth } from '../../contexts/AuthContext';
import styles from '../../style';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../constants/firebase";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser} = useAuth();
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSearch = async () => {
    console.log()
    console.log(username)
    const q = query(
      collection(db, "users"),
      where("displayName", "==",  username.charAt(0).toUpperCase() + username.slice(1))
    );
    try {
      
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err)
    }
  };
  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
       
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res)
      if (res.exists()) {
        //create a chat in chats collection
        console.log("Result exits")
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };
  return (
    <div className="2 font-poppins">
    <div className="searchForm2 m-3">
      <input
        type="text"
        placeholder="Search"
        onKeyDown={handleKey}
        className="block w-full text-sm  bg-gray-60 text-gray-700 border rounded 
       py-2 px-2 leading-tight focus:outline-none focus:bg-white font-poppins
        "
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
    </div>
    {err && <span>User not found!</span>}
    {user && (
      <div className="userChat bg-slate-200 " onClick={handleSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userChatInfo text-black">
          <span className='text-black'>{user.displayName}</span>
        </div>
      </div>
    )}
  </div>
  )
}

export default Search
