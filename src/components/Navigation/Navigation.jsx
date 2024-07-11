import React from 'react'
import { NavLink } from 'react-router-dom'

const Navigation = () => {
  return (
    <div>
        <nav>
        <NavLink to="/signup">Try tracker</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </div>
  )
}

export default Navigation