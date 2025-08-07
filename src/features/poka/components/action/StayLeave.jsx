import { useNavigate, useParams } from 'react-router-dom';

import { useSitDownMutation } from 'poka/api/pokaApi';
import useSnackBar from 'hooks/useSnackBar';
import Overlay from 'ui/Overlay';
import Button from 'ui/Button';
import './StayLeave.scss';

const StayLeave = () => {
  const { gameId } = useParams();
  const [sitDownn, { isLoading }] = useSitDownMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const navigate = useNavigate();

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
