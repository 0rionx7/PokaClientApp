import DeniedCards from '@poka/components/player/DeniedCards';
import StatusInfo from '@poka/components/player/StatusInfo';
import { formatNumber } from '@utils/helper-functions';
import useTimerBar from '@poka/hooks/useTimerBar';
import ToolTip from '@ui/ToolTip';
import './PlayerInfo.scss';

const PlayerInfo = ({ playerState }) => {
  const timerBar = useTimerBar(playerState);
  const { playerName, swapped, bet, resta } = playerState;

  const backgroundColor = playerState.isInGame ? '#221f1b' : '#a00000';

  return (
    <div className="player-info-container" style={{ backgroundColor }}>
      <div className="playername">
        <StatusInfo playerState={playerState} />
        {playerName}
      </div>
      {timerBar}
      <div className="gameplay-info">
        {swapped > 0 && (
          <>
            <span id="swapped"> {swapped}</span>
            <ToolTip info="πραγμ. αλλαγές" />
          </>
        )}
        {formatNumber(resta - bet)}
        <DeniedCards playerState={playerState} />
      </div>
      {bet > 0 && (
        <div className="total-bet">
          {formatNumber(bet)}
          <ToolTip info="συν.ποντάρισμα" />
        </div>
      )}
    </div>
  );
};

export default PlayerInfo;
