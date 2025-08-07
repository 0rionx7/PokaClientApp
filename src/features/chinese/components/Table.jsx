import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useSitOutChineseMutation,
} from '@chinese/api/chineseApi';
import { resetMessages } from '@poka/slice/pokaStateSlice';
import { selectUserName } from '@account/slice/accountSlice';
import { playerEntry } from '@utils/utilities-functions';
import DealerScreen from '@chinese/components/dealer/DealerScreen';
import SitOut from '@chinese/components/SitOut';
import StayLeave from '@chinese/components/StayLeave';
import RoundInfo from '@chinese/components/RoundInfo';
import Board from '@chinese/components/Board';
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
