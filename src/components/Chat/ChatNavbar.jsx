import React from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { logo } from '../../assets/index';
const ChatNavbar = () => {
  const {currentUser} = useAuth()
  return (
    <div className='navbar font-poppins text-white'>
      <span className="logo">
        <img src={logo} />
      </span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span className='text-black'>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default ChatNavbar
