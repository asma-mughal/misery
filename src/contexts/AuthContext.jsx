import React, { useContext, useEffect, useState } from 'react';
import {auth} from '../constants/firebase';
import { Link, useNavigate  } from 'react-router-dom';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut,onAuthStateChanged, sendPasswordResetEmail , updateEmail, updatePassword, GoogleAuthProvider,
    signInWithPopup, signInWithRedirect,
} from 'firebase/auth';
import { URL } from '../constants/constants';
const AuthContext = React.createContext();
export function useAuth() {
    return useContext(AuthContext)
}
export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState();
    const [showSide, setShowSide] = useState(false);
    const [loading,setLoading] = useState(true); //by default we are loading
    const [googleFb, setGoogleFb] = useState(false);
    const [registermsg, setRegistermsg] = useState({});
    const [success, setSuccess] = useState(false);
    const [OTPmsg,setOTPmsg] = useState({});
    const [socialLogin,setSocialLogin] = useState(false);
    const [loginsuccess, setLoginSuccess] = useState(false);
    const [loginSuccess2, setLoginSuccess2] = useState(false);
    const [emailVerifySuccess, setEmailVerify] = useState(false);
    const [updatePasswordSuccess, setUpdatePassword] = useState(false);
    const [maindata, setData] = useState({});
    function signup(email,password,phone,user,address, value, calendar,imageUpload, addr) {
     //console.log(user, email, password, phone, address, value, calendar, imageUpload, addr)
     //setRegistermsg(email)
     fetch('http://127.0.0.1:3000/users/register-user', {
        method: 'POST',  
        
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wallet_key:'675893jdhnbhe3',
          name: user, 
          email: email,
          phone:phone,
          address:address,
          date_of_birth:calendar,
          password:password,
          user_type:'_',
          longitude:'76.3',
          latitude:'12.5',
          address_details:'abc',
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData) + 
                alert("Congratulations! You have registered") +
                + setSuccess(responseData.success) +
                setRegistermsg(JSON.stringify(responseData))
            )
        })
        .catch(error => console.log(error.toString()))
        
        
          return success;
    }
    function login(email,password) {
      fetch('http://127.0.0.1:3000/users/login-user', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password:password,
        })
    })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData) + 
                alert("Congratulations! You have enrolled") +setLoginSuccess2(responseData.success)
                +setData(responseData.data)
            )
        })
        .catch(error => console.log(error.toString()))
        localStorage.setItem('Data', maindata)
    }
    function logout() {
        fetch('http://127.0.0.1:3000/users/login-user', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
             
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData) + 
                    alert("You have logged Out") 
                )
            })
            .catch(error => console.log(error.toString()))
      }
    function sendOTP(email) {
        fetch(`http://127.0.0.1:3000/users/send-otp`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: email,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> "+ JSON.stringify(responseData)+
                    setOTPmsg(JSON.stringify(responseData))+
                     alert("Congratulations! You have enrolled")+ setLoginSuccess(responseData.success)
                    
                )
            })
            .catch(error => console.log(error.toString()))
    }
    function updateE(email,password,phone,user,address, value) {
        console.log(user, email, password, phone, address, value)
        fetch(`${URL}/update-user`, {
         method: 'PUT',
         headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
           name: user, 
           email: email,
           phone:number,
           address:address, 
           user_type:value,
         })
     })
         .then((response) => response.json())
         .then((responseData) => {
             console.log(
                 "POST Response",
                 "Response Body -> " + JSON.stringify(responseData) + 
                 alert("Congratulations! You have enrolled - Go to login page")
             )
         })
         .catch(error => console.log(error.toString()))
           //return createUserWithEmailAndPassword(auth, email,password)
    }
    function verifyEmail(code) {
        fetch(`http://127.0.0.1:3000/users/verify-email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: code,
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> "+ JSON.stringify(responseData)+
                    setOTPmsg(JSON.stringify(responseData))+
                     alert("Congratulations! email has been verified")+ 
                     setEmailVerify(responseData.success)
                    
                )
            })
            .catch(error => console.log(error.toString()))
    }
    function updatePass(email, oldpass, newpassword) {
        fetch('http://127.0.0.1:3000/users/update-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
                new_password:newpassword,
                old_password:oldpass
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData) +
                     alert("Congratulations! Password has been updated")+
                     setUpdatePassword(responseData.success)
                )
            })
            .catch(error => console.log(error.toString()))
    }
    function resetPassword(email, password){
        fetch(`${URL}/reset-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               
              email: email,
              password:password
            })
        })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(
                    "POST Response",
                    "Response Body -> " + JSON.stringify(responseData) + alert("Congratulations! You have enrolled")
                )
            })
            .catch(error => console.log(error.toString()))
    }
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        // signInWithPopup(auth, provider);
        signInWithRedirect(auth, provider)
      };
      const googleSignOut = () =>{
        signOut(auth)
	
        .then(function() {
           console.log('Signout Succesfull')
        }, function(error) {
           console.log('Signout Failed')  
        });
      }
    useEffect(()=>{
        //at first it'll check whether the user is signIn or not
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
        setCurrentUser(currentUser)
        setLoading(false)
        //console.log(currentUser)
    })  
    return unsubscribe

    },[])

    
    const value ={
        currentUser, 
        signup,
        login,
        logout,
        resetPassword,
        updateE,
        updatePass,
        googleSignIn,
        googleFb, setGoogleFb,
        showSide, setShowSide,
        success,
        registermsg,
    sendOTP,
    OTPmsg,
    socialLogin,setSocialLogin,
    loginsuccess, setLoginSuccess,
    loginSuccess2,
    verifyEmail,
    emailVerifySuccess,
     setEmailVerify,
     updatePasswordSuccess, setUpdatePassword,
     googleSignOut,
     maindata
    }
  return (
  <AuthContext.Provider value={value}>
{!loading && children}
  </AuthContext.Provider>  
  )
}

