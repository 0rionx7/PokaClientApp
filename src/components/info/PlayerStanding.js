import { memo } from 'react';

import StatusIcon from 'components/ui/StatusIcon';
import './Standings.scss';

const PlayerStanding = ({ playerState }) => {
  const cava = playerState.resta - playerState.buyIn;
  const color = value => (value >= 0 ? { color: '#04fa04' } : { color: 'red' });

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <div className="player-name">{playerState.playerName}</div>
      <div className="cava">
        <div style={color(playerState.resta)}>{playerState.resta}</div>
      </div>
      <div className="cava">
        <div style={color(cava)}>{cava}</div>
      </div>
    </div>
  );
};

export default memo(PlayerStanding);
