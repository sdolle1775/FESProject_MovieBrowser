import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/OMDbAPI.png'
import MobileNav from './MobileNav.jsx'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="nav-links" aria-label="Primary navigation">
      <div className="logo">
        <img src={logo} alt="OMDb API" />
      </div>

      <div className="links flex align-center justify-between">
        <NavLink to="/home" className="link">
          Home
        </NavLink>
        <NavLink to="/" end className="link">
          Find Your Movie
        </NavLink>
        <a href="mailto:sam@example.com" className="btn-contact">
          Contact
        </a>
      </div>

      <MobileNav
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen((open) => !open)}
        onClose={() => setIsMenuOpen(false)}
      />
    </nav>
  )
}

export default Navbar
