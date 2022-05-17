import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FeedControl from "./FeedControl";
import SignUp from "./auth/SignUp"
import Profile from "./auth/Profile"
import UpdateProfile from "./auth/UpdateProfile"
import LogIn from './auth/LogIn'

export default function AppRoutes() {
  const { currentUser } = useAuth()

  return (
  <Router>
    <Routes>
      <Route exact path="/" element={<FeedControl/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/profile" element={currentUser ? <Profile/> : <LogIn/>}/>
      <Route path="/update-profile" element={currentUser ? <UpdateProfile/> : <LogIn/>}/>
    </Routes>
  </Router>
)
}
