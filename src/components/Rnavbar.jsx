import React, {useEffect, useState} from 'react'
import {Navbar, NavDropdown, Form, FormControl, Button, Nav, Container} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {signOut} from 'firebase/auth'
import { auth } from '../firebaseConfig'
import {useAuthState} from 'react-firebase-hooks/auth'


export default function Rnavbar() {
    const [user] = useAuthState(auth);
    
  return (
    
    <div>
        <Navbar collapseOnSelect expand='lg' className='r-navbar'>
            <Container>
                <Nav className='me-auto'>
                    <Navbar.Brand>MenuFinder</Navbar.Brand>
                </Nav>
                <Navbar.Toggle aria-c ontrols="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Our Story</Nav.Link>
            <Nav.Link as={Link} to="/">Contact</Nav.Link>
            
          </Nav>
          
          <Nav>
            {
                user?(
                    <>
                    <Nav.Link as={Link} to="/additem">Add Item</Nav.Link>
                    <button
                    class="btn btn-outline-primary"
                    type="button"
                    data-mdb-ripple-color="dark"
                    onClick={()=>{signOut(auth)}}
                  >
                    Logout
                  </button>

                    </>
                ):(
                    <>
                    <Nav.Link as={Link} to="/signup">SignUp</Nav.Link>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    </>
                )
            }
            <Nav.Link as={Link} to="/cart" className='bi bi-cart'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}
