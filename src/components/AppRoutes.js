import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FeedControl from "./FeedControl";
import SignUp from "./auth/SignUp"
import Profile from "./auth/Profile"
import UpdateProfile from "./auth/UpdateProfile"
import LogIn from './auth/LogIn'
import UploadImage from './UploadImage';

export default function AppRoutes() {
  const { currentUser } = useAuth()

  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<FeedControl/>}/>
      <Route path="/upload" element={<UploadImage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={currentUser ? <FeedControl/> : <LogIn/>}/>
      <Route path="/profile" element={currentUser ? <Profile/> : <LogIn/>}/>
      <Route path="/update-profile" element={currentUser ? <UpdateProfile/> : <LogIn/>}/>
    </Routes>
  </Router>
)
}
