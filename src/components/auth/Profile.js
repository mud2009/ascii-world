import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const { currentUser, logOut } = useAuth();
  const [ error, setError ] = useState("")
  const navigate = useNavigate()

  async function handleLogOut(){
    setError("")
    try {
      await logOut()
      navigate("/login")
    } catch {
      setError("Could not Log Out")
    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <p><strong>Email:</strong> {currentUser.email}</p>
          <p><strong>Username:</strong> {currentUser.displayName}</p>
          <Link to="../update-profile" className='btn btn-primary w-100 mt-3'>Update Profile</Link>
          <Button className='btn btn-primary w-100 mt-3' onClick={handleLogOut}>Log Out</Button>
        </Card.Body>
      </Card>
    </>
  )
}