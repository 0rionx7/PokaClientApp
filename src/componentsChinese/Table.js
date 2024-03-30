import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateChineseQuery } from 'features/gameStateChinese/gameStateApi';
import { playerEntry } from 'utils/utilities-functions';
import DealerScreen from 'componentsChinese/dealer/DealerScreen';
import SitOut from 'componentsChinese/SitOut';
import StayLeave from 'componentsChinese/StayLeave';
import RoundInfo from 'componentsChinese/RoundInfo';
import Board from 'componentsChinese/Board';
import classes from './Table.module.scss';

const Table = () => {
  const { gameId } = useParams();
  const { username } = useSelector(state => state.account);
  const { data } = useGetGameStateChineseQuery(gameId);
  const hostPlayerState = data.playersStateList.find(playerEntry(username));

  if (!data) return <h3>waiting for others to join...</h3>;

  const isDealer = !data.playersStateList.findIndex(playerEntry(username));
  const playerCount = data.playersStateList.length;

  return (
    <div className={classes['table'] + ' ' + classes[`players-${playerCount}`]}>
      {isDealer && data.round === 1 && !data.currentPlayerList.length && (
        <DealerScreen />
      )}
      {data.playersStateList.length > 1 && (
        <>
          <RoundInfo round={data.round} />
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
