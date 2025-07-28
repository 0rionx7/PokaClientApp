import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import { useActionContainerNode } from 'utils/ActionContainerContext';
import { playerEntry } from 'utils/utilities-functions';
import NextRound from 'components/action/NextRound';
import Results from 'components/info/Results';
import LiveInfo from 'components/action/LiveInfo';
import Overlay from 'components/ui/Overlay';
import Play from 'components/action/Play';
import Renew from 'components/action/Renew';
import './Action.scss';

const Action = ({ hideInfo }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(selectPlayername);
  const {
    data: { playerStates, currentPlayerList, dealer },
  } = useGetGameStateQuery(gameId);
  const { setActionContainerNode } = useActionContainerNode();

  const hostPlayerState = useMemo(
    () => playerStates.find(playerEntry(hostPlayerName)),
    [playerStates, hostPlayerName]
  );

  const [currentPlayer] = currentPlayerList;
  const hostTurn = currentPlayer?.playerName === hostPlayerName;

  return (
    <div
      className={`action-container ${hideInfo ? 'full-width' : ''}`}
      ref={node => {
        setActionContainerNode(node);
        return () => {
          setActionContainerNode(null);
        };
      }}>
      {currentPlayer?.handInfo?.kind ? (
        <Results />
      ) : hostTurn || hostPlayerState.jokering ? (
        <Play />
      ) : (
        !dealer && <LiveInfo />
      )}
      {hostPlayerState.resta === 0 && !hostPlayerState.sittingOut && <Renew />}
      {currentPlayer?.handInfo?.kind && <NextRound />}
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
