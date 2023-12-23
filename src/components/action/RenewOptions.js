import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useRenewCavaMutation,
} from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const RenewOptions = () => {
  const { gameId } = useParams();
  const [renew, { isSuccess, isLoading, error }] = useRenewCavaMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const {
    data: { cava },
  } = useGetGameStateQuery(gameId);

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const options = [0.2 * cava, 0.5 * cava, 0.8 * cava, cava];

  return (
    <>
      <div className="renew-options">
        {snackElement}
        {options.map(option => (
          <Button
            prompt={option.toLocaleString()}
            onClick={() => renew({ gameId, amount: option })}
            disabled={isLoading || isSuccess}
            className="green"
            key={option}
          />
        ))}
      </div>
    </>
  );
};

export default RenewOptions;
