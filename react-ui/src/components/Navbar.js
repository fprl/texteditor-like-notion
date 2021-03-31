import React from 'react'

const Navbar = (props) => {
  return (
    <nav className="navbar">
      {props.children}
    </nav>
  )
}

export default Navbar