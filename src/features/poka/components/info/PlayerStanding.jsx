import { memo } from 'react';

import StatusIcon from 'components/ui/StatusIcon';
import './Standings.scss';

const PlayerStanding = ({ playerState }) => {
  const sum = playerState.resta - playerState.buyIn;
  const color = value =>
    value >= 0 ? { color: 'rgb(2 165 2)' } : { color: 'red' };

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <div className="player-name">{playerState.playerName}</div>
      <div className="cava">
        <div style={color(playerState.resta)}>
          {playerState.resta.toLocaleString()}
        </div>
      </div>
      <div className="cava">
        <div style={color(sum)}>{sum.toLocaleString()}</div>
      </div>
    </div>
  );
};

export default memo(PlayerStanding);
