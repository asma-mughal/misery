import React, { useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import {AuthProvider} from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import { SignIn, Signup, UpdateProfile,ForgotPassword, PasswordUpdate, CampaignPage } from './pages';
import Ruff from './pages/Ruff';
import ChatPage from './pages/ChatPage';
import { ChatContextProvider } from './contexts/ChatContext';
import OTP from './pages/OTP';
import Index from './components/Discussion/StackOverflow';
import QuestionPage from './components/Discussion/AddQuestion';
import ViewIndex from './components/Discussion/ViewQuestion/ViewIndex';
import ProtectedRoute from './components/ProtectedRoute';
import VerifyEmail from './pages/VerifyEmail';
const App = () => {
const [campaign,setCampaign] = useState({});
const [question,setQuestion] = useState({});
  return (
    <> 
    <AuthProvider>
      <ChatContextProvider>
<Routes>
   <Route path="/" element={<Dashboard campaign={campaign} setCampaign={setCampaign} />} />
    <Route path ="/signin" element={<SignIn />} />
    <Route path ="/signup" element={<Signup />} />
    <Route path="/update" element={<UpdateProfile />} />
    <Route path="/forgot" element={<ForgotPassword />} />
    <Route path='/chat' element={<ChatPage />} />
    <Route path="/ruff" element={<Ruff />} />
    <Route path ="/OTP" element={<OTP />} />
    <Route path='/pass' element={<PasswordUpdate />} />
    <Route path='/verify' element={<VerifyEmail />} />
    <Route path='/projPage' element={<CampaignPage 
    campaign={campaign}
     setCampaign={setCampaign} />} />
<Route path ="/dis"  element={ 
  <Index  question={question}
  setQuestion={setQuestion}   />}/>
  <Route path ="/add" element={
  <QuestionPage  />} />
  <Route path ="/view" element={<ViewIndex question={question} setQuestion={setQuestion} />} /> 


</Routes>

</ChatContextProvider>
</AuthProvider>
</>
  )
}

export default App
{/*

<Route path ="/dis"  element={ <ProtectedRoute>
  <Index /></ProtectedRoute>}/>
  <Route path ="/add" element={<ProtectedRoute>
  <QuestionPage /></ProtectedRoute>} />
  <Route path ="/view" element={<ProtectedRoute><ViewIndex /></ProtectedRoute>} /> */}