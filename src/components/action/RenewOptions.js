import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

import { useRenewCavaMutation } from 'src/features/gameApi/gameStateMutations/useRenewCavaMutation';
import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import useSnackBar from 'src/hooks/useSnackBar';
import Button from 'src/components/ui/Button';

const RenewOptions = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const { cava } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({ cava: data.cava }),
  });
  const [renew, { isSuccess, isLoading, error }] = useRenewCavaMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const options = [0.25 * cava, 0.5 * cava, 0.75 * cava, cava];

  return (
    <>
      <div className="renew-options">
        {snackElement}
        {options.map(option => (
          <Button
            prompt={option}
            onClick={() => renew(option)}
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
