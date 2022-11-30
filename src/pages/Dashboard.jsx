import React,{useState} from 'react'
import {Navbar, Hero,AboutUs, Projects, ContactUs, Footer } from '../components/index';
import styles from '../style';
import { useAuth } from '../contexts/AuthContext';
import Bot from '../components/Bot';
import { GoogleLogout } from 'react-google-login';
const Dashboard = ({campaign,setCampaign}) => {
  const {googleSignOut} = useAuth()
  const [click, setClick] = useState(false)
  const [color, setColor] = useState(false);
  
  return (
    <div className="">
    <Navbar color={color} setColor={setColor} click={click} setClick={setClick} />

    <Hero click={click}  />

        <Projects campaign={campaign} setCampaign={setCampaign} />
      
    <div className={`bg-primary `}>
      <div className={``}>
       <AboutUs />
       <ContactUs />
      </div>
    </div>
    <div className={`bg-primary `}>
      <div className={`${styles.boxWidth}`}>
      
        <Footer />
        </div>
       {/*<button className='bg-white' onClick={handleLogout}>Logout</button> */} 
        </div>
  </div>
  )
}

export default Dashboard
