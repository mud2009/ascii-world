import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import PostList from "./PostList";

export default function FeedControl() {
  const { currentUser } = useAuth();
  
  if(!currentUser){
    return (
      <>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log in to view ASCII World</h2>
            <Link className='btn btn-primary w-100 mt-3' to="/login">Log In</Link>
          </Card.Body>
        </Card>
      </>
    )

  } else {
      return(
        <React.Fragment>
          <PostList/>
        </React.Fragment>
      )
    }  
  }
