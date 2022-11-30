import { useState } from "react";

import { close, logo, menu } from "../assets";
import { navLinks } from '../constants/constants';
import { FaBars, FaTimes } from 'react-icons/fa'
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";
import { GoogleLogout } from 'react-google-login';
import './style.css';
import { db } from "../constants/firebase";
import { Link,animateScroll as scroll} from 'react-scroll'
const Navbar = ({color,click,setColor,setClick}) => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const {currentUser,maindata} = useAuth();
  
  const {loginSuccess2} = useAuth();
  useEffect (()=>{
  const store = async() =>{
    await setDoc(doc(db, "users", currentUser.uid), {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
      email:currentUser.email,
      photoURL: currentUser.photoURL,
    });
    await setDoc(doc(db, "userChats", currentUser.uid), {});
  }
  store()
  
  },[])
  const handleClick = () => setClick(!click)
    const handleClick2 = (i) =>{
    if(i==='Login') {
      navigate("/signin")
    }
    if(i==='Discussion') {
      navigate("/dis")
    }
    if(i==='Profile') {
      navigate("/update")
    }
    }
    const changeColor = () =>{
        if(window.scrollY>=90){
        setColor(true)
      
        }
        else {
            setColor(false)
        }
    }
    const res = localStorage.getItem('Verify')
    console.log(currentUser)
    window.addEventListener('scroll', changeColor)
    const links = [
        {
          id: 1,
          link: "home",
        },
        {
          id: 2,
          link: "projects",
        },
       
        {
          id: 3,
          link: "about",
        },
        {
          id: 4,
          link: "contact",
        },
        {
          id: 5,
          link: "Discussion",
        },
        {
          id: 6,
          link: res? 'Profile' : 'Login',
        },
      ];
  return (
    <div className={color? 'header header-bg' : ' header'}>
    <nav className='navbar font-poppins '>
    <div>
    <h1 className={`${!color && 'lg:text-white'}
     font-bold tracking-widest text-xl text-black `}>HELPING HANDS</h1>
  </div>
        <div className='hamburger' onClick={handleClick}>
            {click ? (<FaTimes size={25} style={{ color: 'black' }} />)
                : (<FaBars size={25} style={{ color: 'black' }} />)}

        </div>
        <ul className={click ? "nav-menu active"  : " nav-menu"}>
            
            {links.map((i)=>

            <li
            className={`p-4  ${color? 'text-black ' : 'text-white '}
            ${color? 'hover:text-black ' : 'hover:font-bold'}
              font-semibold  uppercase text-sm duration-200 cursor-pointer`}>
          <Link  
         onClick={()=> {setClick(!click)
          handleClick2(i.link)
        }}
          style={{
            color : color ? 'black' :'white'
          }}
          activeClass='active'
          smooth spy to={i.link}>
            {i.link}
            </Link>
            </li>
            )}
          
        </ul>
    </nav>
</div>
  );
};

export default Navbar;