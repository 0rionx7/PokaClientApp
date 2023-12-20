import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import NextRound from 'components/action/NextRound';
import Results from 'components/info/Results';
import LiveInfo from 'components/info/LiveInfo';
import Play from 'components/action/Play';
import Renew from 'components/action/Renew';
import './Action.scss';

const Action = ({ hideInfo }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.account.username);
  const {
    data: { playersStateList, currentPlayerStateList, dealer },
  } = useGetGameStateQuery(gameId);

  const hostPlayerState = useMemo(
    () => playersStateList.find(playerEntry(hostPlayerName)),
    [playersStateList, hostPlayerName]
  );

  const [currentPlayer] = currentPlayerStateList;
  const hostTurn = currentPlayer?.playerName === hostPlayerName;

  if (!gameId) return null;
  return (
    <div className={'action-container ' + (hideInfo ? 'full-width' : '')}>
      {hostTurn ? (
        <Play />
      ) : (
        !dealer && !currentPlayer?.handInfo?.kind && <LiveInfo />
      )}
      {currentPlayer?.handInfo?.kind && <Results />}
      {hostPlayerState.resta === 0 &&
        !hostPlayerState.sittingOut &&
        (currentPlayer?.handInfo?.kind || dealer) && <Renew />}
      {hostPlayerState.resta > 0 && currentPlayer?.handInfo?.kind && (
        <NextRound />
      )}
    </div>
  );
};

export default Action;
