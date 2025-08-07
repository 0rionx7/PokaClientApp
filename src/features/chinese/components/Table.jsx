import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useSitOutChineseMutation,
} from 'features/chinese/api/chineseApi';
import { resetMessages } from 'features/poka/pokaStateSlice';
import { selectUserName } from 'features/account/slice/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import DealerScreen from 'features/chinese/components/dealer/DealerScreen';
import SitOut from 'features/chinese/components/SitOut';
import StayLeave from 'features/chinese/components/StayLeave';
import RoundInfo from 'features/chinese/components/RoundInfo';
import Board from 'features/chinese/components/Board';
import classes from './Table.module.scss';

const Table = () => {
  const { gameId } = useParams();
  const username = useSelector(selectUserName);
  const { data } = useGetChineseStateQuery(gameId);
  const [sitOut] = useSitOutChineseMutation();
  const dispatch = useDispatch();
  const hostPlayerState = data.playerStates.find(playerEntry(username));

  useEffect(() => {
    return () => {
      dispatch(resetMessages());
      sitOut({ gameId });
    };
  }, [gameId, sitOut, dispatch]);

  if (!data) return <h3>waiting for others to join...</h3>;

  const isDealer = data.playerStates.findIndex(playerEntry(username)) === 0;
  const playerCount = data.playerStates.length;

  return (
    <div className={classes['table'] + ' ' + classes[`players-${playerCount}`]}>
      <RoundInfo round={data.round} />
      {isDealer && data.round === 1 && !data.currentPlayerList.length && (
        <DealerScreen />
      )}
      {data.playerStates.length > 1 && (
        <>
          {data.playerStates.map((playerState, i) => (
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
