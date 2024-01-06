import React from 'react'
import { Link } from 'react-router-dom'
import hat from "../assets/hat.png"

const NavBar = () => {
  return (
    <nav className="navBar">
        <img src={hat}></img>
        <h1>School</h1>
        <div className='navOptions'>
            <Link to="/">Home</Link>
            <Link to="/classrooms">Classrooms</Link>
            <Link to="/students">Students</Link>
            <Link to="/teachers">Teachers</Link>
        </div>
    </nav>
  )
}

export default NavBar