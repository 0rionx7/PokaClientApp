import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

import { useRestartGameMutation } from 'src/features/gameApi/gameStateMutations/useReastartGameMutation';
import { setGameInfo } from 'src/features/gameStateSlice/gameStateSlice';
import { createTableTitle } from 'src/common/text-functions';
import useSnackBar from 'src/hooks/useSnackBar';
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
