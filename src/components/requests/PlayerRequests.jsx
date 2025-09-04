import { useLocation } from 'react-router-dom';

import { useJoinChineseTableMutation } from '@chinese/api/chineseApi';
import { useGetRequestsQuery } from '@account/api/accountApi';
import { useJoinTableMutation } from '@poka/api/pokaApi';
import PlayerRequest from './PlayerRequest';
import './PlayerRequests.scss';

const PlayerRequests = ({ useGetStateQuery, maxPlayersCount }) => {
  const { data: gameData } = useGetStateQuery();
  const { data } = useGetRequestsQuery(gameData.tableName);
  const { state } = useLocation();

  if (!data) return null;

  const { playerStates, tableName } = gameData;

  const useJoin =
    state.game === 'poka' ? useJoinTableMutation : useJoinChineseTableMutation;

  const requestedStates = data
    .filter(
      (request) =>
        !playerStates.some((ps) => ps.playerName === request.username)
    )
    .map((request) => ({
      playerName: request.username,
      isSubscribed: new Date(request.subExpiration) - Date.now() > 0,
    }));

  return (
    <>
      <div className="player-requests">
        <h4>Συμμετέχοντες</h4>
        {playerStates.map((playerState) => (
          <PlayerRequest
            key={playerState.playerName}
            playerState={playerState}
            useJoin={useJoin}
          />
        ))}
      </div>
      {requestedStates.length > 0 && (
        <div className="player-requests">
          <h4>Αιτούντες συμμετοχής</h4>
          {requestedStates.map((playerState) => (
            <PlayerRequest
              key={playerState.playerName}
              playerState={playerState}
              tableName={tableName}
              tableFull={playerStates.length === maxPlayersCount}
              useJoin={useJoin}
              clickable
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PlayerRequests;
