import React, { useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp(){
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const { signUp, logIn } = useAuth()
  const [error, setError ] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
  async function handleSubmit(e){
    e.preventDefault();
    if(passRef.current.value !== confirmPassRef.current.value){
      return setError("Passwords do not match")
    }
    try{
      setError('')
      setLoading(true)
      await signUp(emailRef.current.value, passRef.current.value)
      await logIn(emailRef.current.value, passRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to create account")
    }
    setLoading(false)
  }

  return(
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passRef}></Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" id="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" required ref={confirmPassRef}></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  )
}