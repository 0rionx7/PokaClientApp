import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { setGameInfo } from 'features/gameState/gameStateSlice';
import { useRestartGameMutation } from 'features/gameState/gameStateApi';
import { createTableTitle } from 'common/text-functions';
import useSnackBar from 'hooks/useSnackBar';
import classes from './Account.module.scss';

const LastGame = ({ savedGame }) => {
  const [restartGame, { error }] = useRestartGameMutation();
  const { snackElement, setSnackInfo } = useSnackBar({ height: '100%' });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setSnackInfo(error.data);
  }, [error, setSnackInfo]);

  const clickHandler = async () => {
    const { data } = await restartGame(savedGame);
    if (!data) return;
    const { id, ...gameInfo } = data;
    dispatch(setGameInfo(gameInfo));
    navigate(`/table/${data.gameId}`);
  };

  const tableTitle = createTableTitle(savedGame.tableName);

  return (
    <>
      {snackElement}
      <div className={classes['last-game']} onClick={clickHandler}>
        {tableTitle}
      </div>
    </>
  );
};

export default LastGame;
