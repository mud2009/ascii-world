import React from "react";
import Header from "./Header";
import MyNavbar from "./MyNavbar";
import FeedControl from "./FeedControl";
import LogIn from "./auth/LogIn"
import SignUp from "./auth/SignUp"
import Profile from "./auth/Profile"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <AuthProvider>
      <MyNavbar />
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
        <div className="w-100" style={{maxWidth: '500px'}}>
          <Router>
            <Routes>
              <Route exact path="/" element={<FeedControl/>}/>
              <Route path="/signup" element={<SignUp/>}/>
              <Route path="/login" element={<LogIn/>}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </Router>
        </div>
      </Container>
      </AuthProvider>
    </>
  );
}

export default App;
