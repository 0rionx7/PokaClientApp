import { useSelector } from 'react-redux';

import { selectHostPlayerState, useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import { useRoomContext } from '@poka/components/RoomContext';
import NextRound from '@poka/components/action/NextRound';
import Results from '@poka/components/info/Results';
import GameInfo from '@poka/components/action/GameInfo';
import Overlay from '@ui/Overlay';
import Play from '@poka/components/action/Play';
import Renew from '@poka/components/action/Renew';
import './Action.scss';

const Action = () => {
  const { data } = useGetPokaStateQuery();
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerState = useSelector(selectHostPlayerState);
  const { setActionContainerNode, isDealing } = useRoomContext();

  const { dealer, nextPlayers } = data;
  const [{ playerName, handInfo, jokerReplacing } = {}] = nextPlayers;
  const hostTurn = playerName === hostPlayerName;
  const showResults = handInfo?.kind;
  const showPlay = hostTurn || hostPlayerState.jokerReplacing;
  const showGameInfo = !dealer;

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
