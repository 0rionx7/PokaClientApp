import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { selectUserName } from 'features/account/slice/accountSlice';

const RouteGuard = ({ element }) => {
  const username = useSelector(selectUserName);
  const location = useLocation();

  return !username ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default RouteGuard;
