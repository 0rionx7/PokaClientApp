import DeniedCards from '@poka/components/player/DeniedCards';
import StatusInfo from '@poka/components/player/StatusInfo';
import ToolTip from '@ui/ToolTip';
import useTimerBar from '@poka/hooks/useTimerBar';
import './PlayerInfo.scss';

const PlayerInfo = ({ playerState }) => {
  const timerBar = useTimerBar(playerState);

  const backgroundColor = playerState.isInGame ? '#221f1b' : '#a00000';

  return (
    <div className="player-info-container" style={{ backgroundColor }}>
      <div className="playername">
        <StatusInfo playerState={playerState} />
        {playerState.playerName}
      </div>
      {timerBar}
      <div className="gameplay-info">
        {!!playerState.swapped && (
          <>
            <span id="swapped"> {playerState.swapped}</span>
            <ToolTip info="πραγμ. αλλαγές" />
          </>
        )}
        {(playerState.resta - playerState.bet).toLocaleString()}
        <DeniedCards playerState={playerState} />
      </div>
      {playerState.bet > 0 && (
        <div className="total-bet">
          {playerState.bet.toLocaleString()}
          <ToolTip info="συν.ποντάρισμα" />
        </div>
      )}
    </div>
  );
};

export default PlayerInfo;
