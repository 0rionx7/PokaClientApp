import { useParams } from 'react-router-dom';

import { useDenyCardMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const DenyAccept = () => {
  const [denyCard, { isLoading }] = useDenyCardMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const { gameId } = useParams();

  const handleAction = async action => {
    const deny = action === 'deny';
    const result = await denyCard({ gameId, deny });
    if (result.error?.data) setSnackInfo(result.error.data);
  };

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt="ΑΡΝΗΣΗ"
        onClick={() => handleAction('deny')}
        disabled={isLoading}
        className="red"
      />
      <Button
        prompt="ΑΠΟΔΟΧΗ"
        onClick={() => handleAction('accept')}
        disabled={isLoading}
        className="green"
      />
    </div>
  );
};

export default DenyAccept;
