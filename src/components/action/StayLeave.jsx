import { useNavigate, useParams } from 'react-router-dom';

import { useSitDownMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import './StayLeave.scss';

const StayLeave = () => {
  const { gameId } = useParams();
  const [sitDownn, { isLoading, error, reset }] = useSitDownMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const navigate = useNavigate();

  if (error) {
    setSnackInfo(error.data);
    reset();
  }

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
            onClick={() => sitDownn({ gameId })}
            disabled={isLoading}
            className="green"
          />{' '}
          <Button
            prompt="Αποχωρώ"
            onClick={() => navigate('/saloon')}
            disabled={isLoading}
            className="red"
          />
        </div>
      </div>
    </Overlay>
  );
};

export default StayLeave;
