import { Link } from 'react-router-dom';

import { useLogOutMutation } from '@account/api/accountApi';
import { logOutSvg, settingsSvg } from 'assets/svgs/various';

const AccountloggedInMenu = ({ setShowMenu }) => {
  const [logOut] = useLogOutMutation();

  return (
    <div className="account-menu" onClick={() => setShowMenu(false)}>
      <Link to="/account" className="menu-item">
        {settingsSvg}Λογαριασμός
      </Link>
      <div
        className="menu-item"
        style={{ color: 'red' }}
        onClick={() => logOut()}>
        {logOutSvg}Αποσύνδεση
      </div>
    </div>
  );
};

export default AccountloggedInMenu;
