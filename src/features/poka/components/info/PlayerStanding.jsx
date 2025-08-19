import { memo } from 'react';

import { formatNumber } from '@utils/helper-functions';
import StatusIcon from '@ui/StatusIcon';
import './Standings.scss';

const PlayerStanding = ({ playerState }) => {
  const { resta, playerName, buyIn } = playerState;
  const sum = resta - buyIn;
  const color = value =>
    value >= 0 ? { color: 'rgb(2 165 2)' } : { color: 'red' };

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <div className="player-name">{playerName}</div>
      <div className="cava">
        <div style={color(resta)}>{formatNumber(resta)}</div>
      </div>
      <div className="cava">
        <div style={color(sum)}>{formatNumber(sum)}</div>
      </div>
    </div>
  );
};

export default memo(PlayerStanding);
