import React from 'react'
import ChatNavbar from './ChatNavbar'
import Search from './Search'
import Chats from './Chats'
const Sidebar = () => {
  return (
    <div className='sidebarChat'>
    <ChatNavbar />
    <Search />
    <Chats />
    </div>
  )
} 

export default Sidebar
