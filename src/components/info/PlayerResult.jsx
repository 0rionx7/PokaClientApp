import { describeHand } from 'utils/text-functions';
import StatusIcon from 'components/ui/StatusIcon';

const PlayerResult = ({ playerState }) => {
  const description = describeHand(playerState.handInfo);

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <span style={{ overflow: 'hidden' }}>{playerState.playerName}</span>
      <span>{description}</span>
      <span
        style={{
          color: playerState.amountWon >= 0 ? 'rgb(2 165 2)' : 'red',
          fontWeight: 600,
        }}>
        {playerState.amountWon.toLocaleString()}
      </span>
    </div>
  );
};

export default PlayerResult;
