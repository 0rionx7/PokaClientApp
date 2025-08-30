import { useLocation, useNavigate } from 'react-router-dom';

import useSnackBar from '@hooks/useSnackBar';
import Overlay from '@ui/Overlay';
import Button from '@ui/Button';
import './StayLeave.scss';
import { useSelector } from 'react-redux';
import { selectGameId } from '@poka/slice/pokaStateSlice';

const StayLeave = ({ useSitDown }) => {
  const gameId = useSelector(selectGameId);
  const [sitDownn, { isLoading }] = useSitDown();
  const { snackElement, setSnackInfo } = useSnackBar();
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleSitDown = async () => {
    const result = await sitDownn({ gameId });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <Overlay style={{ zIndex: 200 }}>
      {snackElement}
      <div className="sitback">
        <div style={{ textAlign: 'center' }}>
          {'Έχετε σηκωθεί απο το τραπέζι.\nΘέλετε να ξανακαθήσετε;'}
        </div>
        <div>
          <Button
            prompt="Ξανακάθομαι"
            onClick={handleSitDown}
            disabled={isLoading}
            className="green"
          />
          <Button
            prompt="Αποχωρώ"
            onClick={() => navigate('/saloon', { state })}
            disabled={isLoading}
            className="red"
          />
        </div>
      </div>
    </Overlay>
  );
};

export default StayLeave;
