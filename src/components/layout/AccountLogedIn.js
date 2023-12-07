import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOutSvg, settingsSvg } from 'assets/svgs/various';
import { logout } from 'features/account/accountSlice';

const AccountloggedInMenu = ({ setShowMenu }) => {
  const dispatch = useDispatch();

  return (
    <div className="account-menu" onClick={() => setShowMenu(false)}>
      <Link to="/account" className="menu-item">
        {settingsSvg}Λογαριασμός
      </Link>
      <div
        className="menu-item"
        style={{ color: 'red' }}
        onClick={() => dispatch(logout())}>
        {logOutSvg}Αποσύνδεση
      </div>
    </div>
  );
};

export default AccountloggedInMenu;
