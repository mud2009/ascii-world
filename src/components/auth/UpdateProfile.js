import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function UpdateProfile() {
  const displayNameRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const { currentUser, updatePass, updateEmail, updateDisplayName } = useAuth()
  const [error, setError ] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    if(passRef.current.value !== confirmPassRef.current.value){
      return setError("Passwords do not match")
    }

    const promises = []

    setLoading(true)
    setError("")

    if(emailRef.current.value !== currentUser.email){
      promises.push(updateEmail(emailRef.current.value))
    }

    if(passRef.current.value){
      promises.push(updatePass(passRef.current.value))
    }

    if(displayNameRef.current.value !== currentUser.displayName){
      promises.push(updateDisplayName(displayNameRef.current.value))
    }

    Promise.all(promises).then(() => {
      navigate("/")
    }).catch(() => {
      setError("Failed to update profile")
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="displayName">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" required ref={displayNameRef} defaultValue={currentUser.displayName}></Form.Control>
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} defaultValue={currentUser.email}></Form.Control>
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passRef} placeholder={"Leave blank to keep the same"}></Form.Control>
            </Form.Group>
            <Form.Group id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPassRef} placeholder={"Leave blank to keep the same"}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Update Information
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}
