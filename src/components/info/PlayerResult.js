import { describeHand } from 'lib/text-functions';
import StatusIcon from 'components/ui/StatusIcon';

const PlayerResult = ({ playerState }) => {
  const description = describeHand(playerState.handInfo);

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <span style={{ overflow: 'hidden' }}>{playerState.playerName}</span>
      <span>{description}</span>
      <span style={{ color: playerState.amountWon >= 0 ? '#04fa04' : 'red' }}>
        {playerState.amountWon.toLocaleString()}
      </span>
    </div>
  );
};

export default PlayerResult;
