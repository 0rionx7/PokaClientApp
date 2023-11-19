import { useEffect } from 'react';

import { useDenyCardMutation } from 'src/features/gameApi/gameStateMutations/useDenyCardMutation';
import useSnackBar from 'src/hooks/useSnackBar';
import Button from 'src/components/ui/Button';

const DenyAccept = () => {
  const [denyCard, { isLoading, error }] = useDenyCardMutation();
  const { snackElement, setSnackInfo } = useSnackBar();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  return (
    <div className="buttons-container">
      {snackElement}
      <Button
        prompt="ΑΡΝΗΣΗ"
        onClick={() => denyCard(true)}
        disabled={isLoading}
        className="red"
      />
      <Button
        prompt="ΑΠΟΔΟΧΗ"
        onClick={() => denyCard(false)}
        disabled={isLoading}
        className="green"
      />
    </div>
  );
};

export default DenyAccept;
