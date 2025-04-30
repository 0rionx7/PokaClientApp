import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

import { selectPlayername } from 'features/account/accountSlice';

const RouteGuard = ({ element }) => {
  const username = useSelector(selectPlayername);
  const location = useLocation();

  return !username ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default RouteGuard;
