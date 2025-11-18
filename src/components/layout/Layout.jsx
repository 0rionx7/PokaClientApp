import { Outlet } from 'react-router-dom'

import MainNavigation from '@layout/MainNavigation.'
import Footer from '@layout/Footer'
import './Layout.scss'

const Layout = () => {
  return (
    <div className="main-grid">
      <MainNavigation />
      <div className="main-area">
        <div className="yin-yang">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Layout
