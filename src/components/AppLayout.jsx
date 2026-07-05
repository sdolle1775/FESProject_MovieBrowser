import { Outlet } from 'react-router-dom'
import Footer from './Footer.jsx'

function AppLayout() {
  return (
    <div className="app-shell">
      <Outlet />
      <Footer />
    </div>
  )
}

export default AppLayout
