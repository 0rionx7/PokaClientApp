import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserName } from '@account/api/accountApi';
import AccountloggedInMenu from '@layout/AccountLogedIn';
import { accountSvg } from '@icons/various';
import './MainNavigation.scss';

const MainNavigation = () => {
  const username = useSelector(selectUserName);
  const [showMenu, setShowMenu] = useState(false);
  const { state } = useLocation();

  return (
    <header className="header-container">
      <Link to="/" className="header-logo">
        {username}
      </Link>
      <nav className="nav-items">
        {username && !showMenu && (
          <>
            <Link
              to="/saloon"
              state={{ game: 'poka' }}
              className={`nav-link${state?.game === 'poka' ? ' active' : ''}`}
            >
              Σαλόνι Πόκας
            </Link>
            <Link
              to="/saloon"
              state={{ game: 'chinese' }}
              className={`nav-link${
                state?.game === 'chinese' ? ' active' : ''
              }`}
            >
              Σαλόνι Κινέζικου Πόκερ
            </Link>
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
              onMouseEnter={() => setShowMenu(true)}
            >
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
      </nav>
    </header>
  );
};
export default MainNavigation;
