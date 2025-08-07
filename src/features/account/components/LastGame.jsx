import { useNavigate } from 'react-router';

import { useRestartGameMutation } from 'poka/api/pokaApi';
import { createTableTitleJsx } from 'utils/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import classes from './Account.module.scss';

const LastGame = ({ savedGame }) => {
  const [restartGame, { isLoading, isSuccess }] = useRestartGameMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const navigate = useNavigate();

  if (!savedGame) return <p>Δεν υπάρχει αποθηκευμένο παιχνίδι</p>;

  const handleRestart = async () => {
    if (isLoading || isSuccess) return;
    const result = await restartGame(savedGame);
    if (result.error?.data) setSnackInfo(result.error.data);
    if (result.data?.gameId) navigate(`/table/${result.data.gameId}`);
  };

  const tableTitle = createTableTitleJsx(savedGame.tableName);

  return (
    <>
      {snackElement}
      <div className={classes['last-game']} onClick={handleRestart}>
        {tableTitle}
      </div>
    </>
  );
};

export default LastGame;
