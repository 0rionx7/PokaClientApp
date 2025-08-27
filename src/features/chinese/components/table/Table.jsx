import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useSitDownChineseMutation,
  useSitOutChineseMutation,
} from '@chinese/api/chineseApi';
import DealerScreen from '@chinese/components/dealer/DealerScreen';
import { resetMessages } from '@account/slice/accountSlice';
import { selectHostPlayerState } from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import RoundInfo from '@chinese/components/table/RoundInfo';
import Board from '@chinese/components/table/Board';
import classes from './Table.module.scss';
import StayLeave from '@components/sitOut/StayLeave';
import SitOut from '@components/sitOut/SitOut';

const Table = () => {
  const { gameId } = useParams();
  const dispatch = useDispatch();
  const username = useSelector(selectUserName);
  const { data } = useGetChineseStateQuery(gameId);
  const [sitOut] = useSitOutChineseMutation();
  const hostPlayerState = useSelector(state =>
    selectHostPlayerState(state, gameId)
  );
  const { playerStates, round, nextPlayers } = data;

  useEffect(() => {
    return () => {
      dispatch(resetMessages());
      sitOut({ gameId });
    };
  }, [gameId, sitOut, dispatch]);

  if (!data) return <h3>waiting for others to join...</h3>;

  const isDealer = playerStates.at(0).playerName === username;
  const playerCount = playerStates.length;

  return (
    <div className={classes['table'] + ' ' + classes[`players-${playerCount}`]}>
      <RoundInfo round={round} />
      {isDealer && round === 1 && !nextPlayers.length && <DealerScreen />}
      {playerStates.length > 1 && (
        <>
          {playerStates.map((playerState, i) => (
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
