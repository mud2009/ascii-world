import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import UploadImage from "./UploadImage";
import PostList from "./PostList";

export default function FeedControl() {
  const [ uploadVisible, setUploadVisible ] = useState(false)
  const { currentUser } = useAuth();
  
  function handleClick(){
    setUploadVisible(!uploadVisible)
  }
  if(!currentUser){
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Profile</h2>
            <Link className='btn btn-primary w-100 mt-3' to="/login">Log In</Link>
          </Card.Body>
        </Card>
      </>
  
    )

  } else {
    if (uploadVisible){
      return(
        <React.Fragment>
          <UploadImage/>
          <button onClick={handleClick}>Return to feed</button>
        </React.Fragment>
  
      )
    } else {
      return(
        <React.Fragment>
          <PostList/>
          <button onClick={handleClick}>Upload image</button>
        </React.Fragment>
      )
    }  
  }
}