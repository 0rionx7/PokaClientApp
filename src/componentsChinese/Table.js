import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateChineseQuery,
  useSitOutChineseMutation,
} from 'features/gameStateChinese/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import DealerScreen from 'componentsChinese/dealer/DealerScreen';
import SitOut from 'componentsChinese/SitOut';
import StayLeave from 'componentsChinese/StayLeave';
import RoundInfo from 'componentsChinese/RoundInfo';
import Board from 'componentsChinese/Board';
import classes from './Table.module.scss';
import { resetMessages } from 'features/gameState/gameStateSlice';

const Table = () => {
  const { gameId } = useParams();
  const username = useSelector(selectPlayername);
  const { data } = useGetGameStateChineseQuery(gameId);
  const [sitOut] = useSitOutChineseMutation();
  const dispatch = useDispatch();
  const hostPlayerState = data.playersStateList.find(playerEntry(username));

  useEffect(() => {
    return () => {
      dispatch(resetMessages());
      sitOut({ gameId });
    };
  }, [gameId, sitOut, dispatch]);

  if (!data) return <h3>waiting for others to join...</h3>;

  const isDealer = data.playersStateList.findIndex(playerEntry(username)) === 0;
  const playerCount = data.playersStateList.length;

  return (
    <div className={classes['table'] + ' ' + classes[`players-${playerCount}`]}>
      <RoundInfo round={data.round} />
      {isDealer && data.round === 1 && !data.currentPlayerList.length && (
        <DealerScreen />
      )}
      {data.playersStateList.length > 1 && (
        <>
          {data.playersStateList.map((playerState, i) => (
            <Board
              key={playerState.playerName}
              playerState={playerState}
              index={i}
            />
          ))}
        </>
      )}
      {hostPlayerState.sittingOut ? <StayLeave /> : <SitOut />}
    </div>
  );
};

export default Table;
