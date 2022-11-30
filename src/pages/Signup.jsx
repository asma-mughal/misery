import React, {useRef, useState, Fragment} from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate  } from 'react-router-dom';
import { eyeClose, eyeIcon,logo, fb, google } from '../assets';
import styles from '../style';

import FacebookLogin from 'react-facebook-login';
import { pakPhoneRegex, interRegex, passRegex, userRegex } from '../constants/constants';
import { Button } from '../components';
import { useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Calendar from '../components/Calendar';
import GoogleSearch from '../components/GoogleSearch';
import './style.css';

const Signup = () => {
    const emailRef= useRef();
    const passRef = useRef();
    const confPassRef = useRef();
    const phoneRef = useRef();
    const userRef = useRef();
    const addressRef = useRef();
    const [userError, setUserError] = useState(true);
    const [passError, setPassError] = useState(true);
    const [calendar, setCalendar] = useState('')
    const [value, setValue] = useState('');
    const [eye, setEye]= useState(false);
    const [imageUpload, setImageUpload] = useState(null);
    const [eyeConf , setEyeConf] = useState(false);
    const logoutHandle = () =>{
      FB.logout(function(response) {
        // user is now logged out
      });
    }
    const {signup,selected,googleSignIn,
      currentUser,setGoogleFb,googleFb, success,socialLogin,setSocialLogin,
      loginsuccess, setLoginSuccess} = useAuth()
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const [address, setAddress] = useState('');

const [coordinates, setCoordinates] = useState({
    longitude:'',
    latitude:''
})

    const navigate = useNavigate();
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    }
      const validationhandle = (value) =>{
        console.log(value)
        const res = userRegex.test(value)
        setUserError(res)
      }
      const validationPass = (value) =>{
        const res1 = passRegex.test(value)
        setPassError(res1)
        console.log(res1)
      }
    useEffect(()=>{
     if(currentUser !=null){
      navigate("/")
     }
    },[])
    const uploadImage = (e) =>{
     const file = e.target.files[0];
     setImageUpload(file.name)
    
 }

 useEffect(()=>{
  if(success){
    navigate("/OTP")
  }
 })
    const handleGoogleSignIn = async() =>{
     try{
     const res = await googleSignIn() 
      localStorage.setItem('googleFb', JSON.stringify());
      console.log(res)
     }catch(e){
      console.log(e)
      setError('Failed to Link account')
     }
    }

    async function handleSubmit (e) {
    e.preventDefault();
    if(passRef.current.value !== confPassRef.current.value){
    return setError('Password do not match');
    }
    else {
        try {
            setError('')
            setLoading(true)
             const res = await signup(emailRef.current.value,passRef.current.value,
            phoneRef.current.value,userRef.current.value,addressRef.current.value, value,calendar,
            imageUpload, address
            );
           
            if(res) {
             
            }
           else {
            alert('Try Again')
           }
        }
       catch(error) {
       console.log(error)
       setError('Failed to create Account')
       }
    setLoading(false)
    }
    }
    const responseFacebook = (response) => {
      
      localStorage.setItem('googleFb', JSON.stringify(true));
      console.log(response);
    }
  return (
   <>
   

        <div className="flex min-h-full items-center justify-center py-5 px-4 
        bg-white
        sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
       
          <div>
            
          <img
              className="mx-auto h-20 w-auto font-poppins "
              src={logo}
              alt="Your Company"
            />
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign up to your account
            </h2>
            
          </div>
          
          {error && <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Failed!</strong>
  <span class="block sm:inline">{error}</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>}

          <form class="w-full max-w-lg" action="#" method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="flex flex-wrap -mx-3 mb-6 rounded-md shadow-sm">
              
              <div class="w-full md:w-1/2 px-3 md:mb-0">
              <label htmlFor="username" className="sr-only">
                  Name
                </label>
                <input
                id="username"
                ref={userRef}
                name="name"
                type="text"
                required
                onChange={()=>{
                  validationhandle(userRef.current.value)
                }}
                placeholder='displayName'
                className={`${styles.inputauth}`}
              />
              <p className={`text-sm font-poppins mb-2
              ${userError? 'text-gray-400' : 'text-red-600'} mx-1
              `}
              style={{
                marginTop:'-0.5rem'
              }}
              >Only characters are allow</p>
             
                 <label htmlFor="email-address" className="sr-only">
             Phone Number
                </label>
              <input
                  id="phone number"
                  ref={emailRef}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder='Email Address'
                  className={`${styles.inputauth}`}
                />
                
              </div>
              <div class="w-full md:w-1/2 px-3">
              <label htmlFor="Phone-number" className="sr-only">
                Email Address
              </label>
             
                <input
                id="phone Number"
                ref={phoneRef}
                name="phone"
                type="tel"
                required
                pattern={pakPhoneRegex || interRegex}
                placeholder='Phone Number'
                className={`${styles.inputauth}`}
              /> <p className="text-transparent"
              style={{
                marginTop:'-0.5rem'
              }}
              >Only characters are allow</p>
                
                <label htmlFor="Phone-number" className="sr-only">
                address
              </label>
             
                <input
                id="phone Number"
                ref={addressRef}
                name="phone"
                type="text"
                required
                placeholder='Address'
                className={`${styles.inputauth}`}
              />
              </div>
              <div  class="w-full px-3">
              <div class="relative">
              
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  ref={passRef}
                  type={eye ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  onChange={()=>validationPass(passRef.current.value)}
                  className={`${styles.inputauth}`}
                  placeholder="Password"
                />
                
              <span class="absolute inset-y-0 right-0 flex items-center pr-2">
        <div 
        type='none'
        class="p-1 focus:outline-none focus:shadow-outline"
        onClick={()=>setEye(!eye)}
        >
     <img src={eye ? eyeIcon : eyeClose} />
        </div>
      </span>
   
              </div>
              <p className={`text-sm font-poppins mb-2
              ${passError? 'text-gray-400' : 'text-red-600'} mx-1
              `}
              style={{
                marginTop:'-0.5rem'
              }}
              >8 to 20 char, with numeric, uppercase and lowercase</p>
              </div>
              <div  class="w-full px-2">
              <div className='relative'>
                <label htmlFor="password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  id="Confpassword"
                  ref={confPassRef}
                  name="confPassword"
                  type={eyeConf? "text" : "password"}
                  required
                  className={`${styles.inputauth}`}
                  placeholder="Confirm Password"
                />
                  <span class="absolute inset-y-0 right-0 flex items-center pr-2">
        <div class="p-1 focus:outline-none focus:shadow-outline"
        onClick={()=>setEyeConf(!eyeConf)}
        >
     <img src={eyeConf ? eyeIcon : eyeClose} />
        </div>
      </span>
              </div>

              <div  class="w-full ">
               <Calendar calendar={calendar}  setCalendar={setCalendar}/>
              </div>
              </div>
              <div className='w-full mx-2'>
              <div class="flex justify-center">
    <div class="w-full ">
        <div class="">
        {imageUpload != null ? <p className='font-poppins text-sm font-bold text-black'>
            Uploaded Image Successfully!</p> : <div class="flex items-center justify-center w-full">
                <label
                    class="flex flex-col w-full h-24 border-2 border-blue-100 border-dashed hover:bg-gray-100 hover:border-gray-300">
                    <div class="flex flex-col items-center justify-center pt-7">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p class="pt-1 text-sm tracking-wider
                        font-poppins text-gray-400 group-hover:text-gray-600">
                            Attach your Image</p>
                    </div>
                    <input type="file" class="opacity-0"
                    onChange={e => uploadImage(e)} 
                    accept=".jpg,.png,.jpeg"
                    />
                </label>
            </div>}
        </div>
      
    </div>
</div> 
<div className='w-full mt-5'>
<GoogleSearch address={address} setAddress={setAddress } coordinates={coordinates}
 setCoordinates={setCoordinates} 


/>
</div>
              </div>
          
            </div>

          
            <div className=''>
            <button
            onClick={handleSubmit}
                  class="bg-secondary border-secondary w-full font-poppins rounded-3xl border p-2
                   text-white transition font-bold "
                >
                  Sign in
                </button>
            </div>
          </form>
          <div className="flex items-center justify-between">
              <div className="flex items-center">
              <p className='font-poppins'>Already have an account? </p>
                <label htmlFor="remember-me" 
                className="ml-2 block text-sm text-gray-900 ">
                <Link to="/signin">
                  <text className='font-poppins text-secondary font-bold'>Login Here</text>
                  </Link>
                </label>
              </div>
            </div>
            <div class="seperator"><b>or</b></div>
            <FacebookLogin
    appId="1057176008302177"
    autoLoad={false}
    cssClass="my-facebook-button-class font-poppins "
    fields="name,email,picture"
    callback={responseFacebook} />
    
    <button className='bg-white   shadow-lg border-0 rounded-none font-poppins  '
    style={{
      backgroundColor:'#C94130',
      width: '100%',
  height: '3rem',
marginTop:'2%',
borderRadius:'3rem',
borderWidth: '2px'
    }}
    
    >   <a href="#" class="btn text-white"
        
        
    onClick={handleGoogleSignIn}><i class="fa fa-google fa-fw "
    >
      </i> Login with Google
    </a>
        </button>
        </div>
      </div>
     


    
   </>
  )
}

export default Signup
