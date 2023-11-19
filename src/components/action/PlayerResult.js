import { describeHand }from 'src/common/text-functions';
import StatusIcon from 'src/components/ui/StatusIcon';

const PlayerResult = ({ playerState }) => {
  const description = describeHand(playerState.handInfo);

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <span style={{ overflow: 'hidden' }}>{playerState.playerName}</span>
      <span>{description}</span>
      <span style={{ color: playerState.amountWon >= 0 ? '#04fa04' : 'red' }}>
        {playerState.amountWon}
      </span>
    </div>
  );
};

export default PlayerResult;
