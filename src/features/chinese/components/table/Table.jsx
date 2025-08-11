import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useSitDownChineseMutation,
  useSitOutChineseMutation,
} from '@chinese/api/chineseApi';
import { resetMessages, selectUserName } from '@account/slice/accountSlice';
import { playerEntry } from '@utils/utilities-functions';
import DealerScreen from '@chinese/components/dealer/DealerScreen';
import RoundInfo from '@chinese/components/table/RoundInfo';
import Board from '@chinese/components/table/Board';
import classes from './Table.module.scss';
import StayLeave from '@components/sitOut/StayLeave';
import SitOut from '@components/sitOut/SitOut';

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
      {isDealer && data.round === 1 && !data.nextPlayers.length && (
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
      {hostPlayerState.sittingOut ? (
        <StayLeave useSitDown={useSitDownChineseMutation} />
      ) : (
        <SitOut />
      )}
    </div>
  );
};

export default Table;
