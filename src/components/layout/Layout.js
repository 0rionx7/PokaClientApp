import { Outlet } from 'react-router-dom';

import MainNavigation from 'src/components/layout/MainNavigation.';
import Footer from 'src/components/layout/Footer';
import './Layout.scss';

const Layout = () => {
  return (
    <div className="main-grid">
      <MainNavigation />
      <div className="main-area">
        <div className="yin-yang">
          <Outlet />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
