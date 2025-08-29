import { selectUserName } from '@account/api/accountApi';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

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
