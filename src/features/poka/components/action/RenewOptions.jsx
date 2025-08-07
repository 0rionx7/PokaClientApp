import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery, useRenewCavaMutation } from '@poka/api/pokaApi';
import useSnackBar from '@hooks/useSnackBar';
import Button from '@ui/Button';

const RenewOptions = () => {
  const { gameId } = useParams();
  const [renew, { isSuccess, isLoading }] = useRenewCavaMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const {
    data: { cava },
  } = useGetPokaStateQuery(gameId);

  const handleRenew = async amount => {
    const result = await renew({ gameId, amount });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  const amounts = [0.2 * cava, 0.5 * cava, 0.8 * cava, cava];

  return (
    <>
      <div className="renew-options">
        {snackElement}
        {amounts.map(amoount => (
          <Button
            key={amoount}
            prompt={amoount.toLocaleString()}
            onClick={() => handleRenew(amoount)}
            disabled={isLoading || isSuccess}
            className="green"
          />
        ))}
      </div>
    </>
  );
};

export default RenewOptions;
