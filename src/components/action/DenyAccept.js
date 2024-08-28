import { useParams } from 'react-router-dom';

import { useDenyCardMutation } from 'features/gameState/gameStateApi';
import useSnackBar from 'hooks/useSnackBar';
import Button from 'components/ui/Button';

const DenyAccept = () => {
  const [denyCard, { isLoading, error, reset }] = useDenyCardMutation();
  const { snackElement, setSnackInfo } = useSnackBar();
  const { gameId } = useParams();

  if (error) {
    setSnackInfo(error.data);
    reset();
  }

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt="ΑΡΝΗΣΗ"
        onClick={() => denyCard({ gameId, deny: true })}
        disabled={isLoading}
        className="red"
      />
      <Button
        prompt="ΑΠΟΔΟΧΗ"
        onClick={() => denyCard({ gameId, deny: false })}
        disabled={isLoading}
        className="green"
      />
    </div>
  );
};

export default DenyAccept;
