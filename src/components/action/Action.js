import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'lib/utilities-functions';
import NextRound from 'components/action/NextRound';
import Results from 'components/info/Results';
import LiveInfo from 'components/info/LiveInfo';
import Overlay from 'components/ui/Overlay';
import Play from 'components/action/Play';
import Renew from 'components/action/Renew';
import './Action.scss';

const Action = ({ hideInfo }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.account.username);
  const {
    data: { playersStateList, currentPlayerList, dealer },
  } = useGetGameStateQuery(gameId);

  const hostPlayerState = useMemo(
    () => playersStateList.find(playerEntry(hostPlayerName)),
    [playersStateList, hostPlayerName]
  );

  const [currentPlayer] = currentPlayerList;
  const hostTurn = currentPlayer?.playerName === hostPlayerName;

  if (!gameId) return null;
  return (
    <div className={'action-container ' + (hideInfo ? 'full-width' : '')}>
      {currentPlayer?.handInfo?.kind ? (
        <Results />
      ) : hostTurn || hostPlayerState.jokering ? (
        <Play />
      ) : (
        !dealer && <LiveInfo />
      )}
      {hostPlayerState.resta === 0 && !hostPlayerState.sittingOut && <Renew />}
      {hostPlayerState.resta > 0 && currentPlayer?.handInfo?.kind && (
        <NextRound />
      )}
      {currentPlayer?.jokering && (
        <Overlay style={{ backgroundColor: 'rgb(0 0 0 / 4%)' }}>
          <div className="waiting-content">
            Αναμονή να ορίσουν οι παίκτες τα μπαλαντέρ
          </div>
        </Overlay>
      )}
    </div>
  );
};

export default Action;
