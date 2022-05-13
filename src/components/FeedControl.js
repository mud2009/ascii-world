import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
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
          <Button className="mb-3" onClick={handleClick}>Return to feed</Button>
        </React.Fragment>
  
      )
    } else {
      return(
        <React.Fragment>
          <PostList/>
          <Button className="mb-3" onClick={handleClick}>Upload image</Button>
        </React.Fragment>
      )
    }  
  }
}