import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectPlayername } from 'features/account/accountSlice';
import AccountloggedInMenu from 'components/layout/AccountLogedIn';
import { accountSvg } from 'assets/svgs/various';
import './MainNavigation.scss';

const MainNavigation = () => {
  const username = useSelector(selectPlayername);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header-container">
      <Link to="/" className="header-logo">
        {username}
      </Link>
      <div className="nav-items">
        {username && !showMenu && (
          <>
            <NavLink to="/saloon" className="nav-link">
              Σαλόνι Πόκας
            </NavLink>
            <NavLink to="/saloon-chinese" className="nav-link">
              Σαλόνι Κινέζικου Πόκερ
            </NavLink>
            <NavLink to="/account" className="nav-link">
              Λογαριασμός
            </NavLink>
          </>
        )}
        {username ? (
          <div className="account-nav" onMouseLeave={() => setShowMenu(false)}>
            {showMenu && <AccountloggedInMenu setShowMenu={setShowMenu} />}
            <div
              className="account-icon"
              onMouseEnter={() => setShowMenu(true)}>
              {accountSvg}
            </div>
          </div>
        ) : (
          <>
            <NavLink to="/login" className="log-btns">
              Σύνδεση
            </NavLink>
            <NavLink to="/register" className="log-btns">
              Εγγραφή
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};
export default MainNavigation;
