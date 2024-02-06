import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { accountSvg } from 'assets/svgs/various';
import AccountloggedInMenu from 'components/layout/AccountLogedIn';
import './MainNavigation.scss';

const MainNavigation = () => {
  const username = useSelector(state => state.account.username);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="header-container">
      <Link to="/" className="logo">
        {username}
      </Link>
      <div className="nav-items">
        {username && !showMenu && (
          <>
            <NavLink to="/saloon" className="nav-link">
              Σαλούν
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
