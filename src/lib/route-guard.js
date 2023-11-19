import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const RouteGuard = ({ element }) => {
  const username = useSelector(state => state.auth.username);
  const location = useLocation();

  return !username ? (
    <Navigate to="/login" state={{ from: location }} replace />
  ) : (
    element
  );
};

export default RouteGuard;
