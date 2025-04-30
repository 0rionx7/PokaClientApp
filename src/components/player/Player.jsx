import { memo } from 'react';

import PlayerInfo from 'components/player/PlayerInfo';
import HandCards from 'components/player/HandCards';
import useSitOutTimer from 'hooks/useSitOutTimer';
import usePlayerClass from 'hooks/usePlayerClass';
import './Player.scss';

const Player = ({ playerState, index }) => {
  const { className, gridArea, chipsPosition, playingIndex } =
    usePlayerClass(index);
  useSitOutTimer(playerState);

  return (
    <div className={className} style={{ gridArea }}>
      <HandCards
        playerState={playerState}
        playingIndex={playingIndex}
        chipsPosition={chipsPosition}
      />
      <div className="player-info">
        <PlayerInfo playerState={playerState} />
        <div className="avatar">{playerState.playerName.slice(0, 1)}</div>
      </div>
    </div>
  );
};

export default memo(Player);
