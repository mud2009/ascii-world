import React, { useRef} from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

export default function MyNavbar() {
  const { currentUser } = useAuth()
  let userDisplay = useRef("Log In")
  let userRoute = useRef("/login")
  if(currentUser){
    userDisplay = currentUser.email
    userRoute = "/profile"
  } else {
    userDisplay = "Log In"
    userRoute = "/login"
  }
  return (
    <div className='ml-2 mr-2'>
      <Navbar className='justify-content-between'>
          <Navbar.Brand href="/">ASCII World</Navbar.Brand>
          <Nav className='flex-grow'>
            <Nav.Link href={userRoute}>{userDisplay}</Nav.Link>
          </Nav>
      </Navbar>
    </div>
    )
}