import React, { useRef, useState} from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function LogIn(){
  const emailRef = useRef();
  const passRef = useRef();
  const { logIn } = useAuth()
  const [error, setError ] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  
  async function handleSubmit(e){
    e.preventDefault();
    try{
      setError('')
      setLoading(true)
      await logIn(emailRef.current.value, passRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to Log In")
    }
    setLoading(false)
  }

  return(
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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
            <Form.Group className="mb-3">
              <Button disabled={loading} className="w-100 mt-3" type="submit">
                Log In
              </Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  )
}