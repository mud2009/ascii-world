import React from "react";
import MyNavbar from "./MyNavbar";
import FeedControl from "./FeedControl";
import LogIn from "./auth/LogIn"
import SignUp from "./auth/SignUp"
import Profile from "./auth/Profile"
import UpdateProfile from "./auth/UpdateProfile"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <AuthProvider>
      <MyNavbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div id="mainContainer" className="w-100" style={{maxWidth: '750px'}}>
          <Router>
            <Routes>
              <Route exact path="/" element={<FeedControl/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/update-profile" element={<UpdateProfile/>}/>
            </Routes>
          </Router>
        </div>
      </Container>
      </AuthProvider>
    </>
  );
}

export default App;
