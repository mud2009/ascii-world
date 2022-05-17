import React, { useRef} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function MyNavbar() {
  const { currentUser } = useAuth()
  let userDisplay = useRef("Log In")
  let userRoute = useRef("/login")
  let uploadRoute = useRef("")

  if(currentUser){
    userDisplay = currentUser.email
    userRoute = "/profile"
    uploadRoute = "/upload"
  } else {
    userDisplay = "Log In"
    userRoute = "/login"
    uploadRoute = "/login"
  }
  return (
    <div className='ml-2 mr-2'>
      <Navbar>
        <Nav className='me-auto'>
          <Navbar.Brand href="/">ASCII World</Navbar.Brand>
          <Nav>
            <Nav.Link href={uploadRoute}>Upload</Nav.Link>
          </Nav>
        </Nav>
          <Nav className='justify-content-end d-flex'>
            <Nav.Link href={userRoute}>{userDisplay}</Nav.Link>
          </Nav>
      </Navbar>
    </div>
    )
}