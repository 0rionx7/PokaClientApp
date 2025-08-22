import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  selectHostPlayerState,
  selectNextPlayers,
  useGetPokaStateQuery,
} from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { useRoomContext } from '@poka/components/RoomContext';
import NextRound from '@poka/components/action/NextRound';
import Results from '@poka/components/info/Results';
import GameInfo from '@poka/components/action/GameInfo';
import Overlay from '@ui/Overlay';
import Play from '@poka/components/action/Play';
import Renew from '@poka/components/action/Renew';
import './Action.scss';

const Action = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerState = useSelector(selectHostPlayerState(gameId));
  const [{ playerName, handInfo, jokerReplacing } = {}] = useSelector(
    selectNextPlayers(gameId)
  );
  const { data } = useGetPokaStateQuery(gameId);
  const { setActionContainerNode } = useRoomContext();
  const { isDealing } = useRoomContext();

  const hostTurn = playerName === hostPlayerName;
  const showResults = handInfo?.kind;
  const showPlay = hostTurn || hostPlayerState.jokerReplacing;
  const showGameInfo = !data.dealer;

  let content;

  if (showResults) content = <Results />;
  else if (showPlay) content = <Play />;
  else if (showGameInfo) content = <GameInfo />;

  return (
    <div
      className="action-container"
      ref={node => {
        setActionContainerNode(node);
        return () => {
          setActionContainerNode(null);
        };
      }}>
      {!isDealing && (
        <>
          {content}
          {hostPlayerState.resta === 0 && !hostPlayerState.sittingOut && (
            <Renew />
          )}
          {handInfo?.kind && <NextRound />}
          {jokerReplacing && (
            <Overlay style={{ backgroundColor: 'rgb(0 0 0 / 4%)' }}>
              <div className="waiting-content">
                Αναμονή να ορίσουν οι παίκτες τα μπαλαντέρ
              </div>
            </Overlay>
          )}
        </>
      )}
    </div>
  );
};

export default Action;
