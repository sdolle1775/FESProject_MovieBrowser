import { NavLink } from 'react-router-dom'

function MobileNav({ isOpen, onToggle, onClose }) {
  return (
    <div id="phone-nav">
      <button
        className={`bento-menu ${isOpen ? 'hide-anim-out' : ''}`}
        type="button"
        aria-label="Open navigation"
        aria-expanded={isOpen}
        onClick={onToggle}
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </button>

      <button
        className={`close-btn ${isOpen ? 'show' : ''}`}
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      ></button>

      <div className={`showMenu ${isOpen ? 'active' : ''}`}>
        <NavLink to="/home" className="link" onClick={onClose}>
          Home
        </NavLink>
        <NavLink to="/" end className="link" onClick={onClose}>
          Find Your Movie
        </NavLink>
        <a href="mailto:sam@example.com" className="link" onClick={onClose}>
          Contact
        </a>
      </div>
    </div>
  )
}

export default MobileNav
