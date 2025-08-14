import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectHostPlayerState,
  selectNextPlayers,
  useGetPokaStateQuery,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { useActionContainerNode } from '@poka/utils/ActionContainerContext';
import NextRound from '@poka/components/action/NextRound';
import Results from '@poka/components/info/Results';
import LiveInfo from '@poka/components/action/LiveInfo';
import Overlay from '@ui/Overlay';
import Play from '@poka/components/action/Play';
import Renew from '@poka/components/action/Renew';
import './Action.scss';

const Action = ({ hideInfo }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerState = useSelector(selectHostPlayerState(gameId));
  const [currentPlayer] = useSelector(selectNextPlayers(gameId));
  const { data } = useGetPokaStateQuery(gameId);
  const { setActionContainerNode } = useActionContainerNode();

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
      ) : hostTurn || hostPlayerState.jokerReplacing ? (
        <Play />
      ) : (
        !data.dealer && <LiveInfo />
      )}
      {hostPlayerState.resta === 0 && !hostPlayerState.sittingOut && <Renew />}
      {currentPlayer?.handInfo?.kind && <NextRound />}
      {currentPlayer?.jokerReplacing && (
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
