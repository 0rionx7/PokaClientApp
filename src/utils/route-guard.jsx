import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUserName } from '@account/api/accountApi';

const RouteGuard = ({ element }) => {
  const location = useLocation();
  const username = useSelector(selectUserName);

  return !username ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default RouteGuard;
