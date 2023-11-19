import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRequestJoinMutation } from 'features/gameApi/gameStateMutations/useRequestJoinMutation';
import useSnackBar from 'hooks/useSnackBar';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';
import './StayLeave.scss';

const StayLeave = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();
  const [requestJoin, { isLoading, error }] = useRequestJoinMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  return (
    <Overlay>
      {snackElement}
      <div className="sitback">
        <div>{'Έχετε σηκωθεί απο το τραπέζι.\nΘέλετε να ξανακαθήσετε;'}</div>
        <div>
          <Button
            prompt="Ξανακάθομαι"
            onClick={() => requestJoin({ gameId })}
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
