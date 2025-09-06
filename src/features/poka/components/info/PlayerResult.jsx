import { describeHand } from '@utils/text-functions';
import StatusIcon from '@ui/StatusIcon';
import { formatNumber } from '@utils/helper-functions';

const PlayerResult = ({ playerState }) => {
  const { playerName, amountWon, handInfo } = playerState;
  const description = describeHand(handInfo);
  const style = {
    color: amountWon >= 0 ? 'rgb(2 165 2)' : 'red',
    fontWeight: 600,
  };

  return (
    <div className="player-result">
      <StatusIcon playerState={playerState} />
      <span style={{ overflow: 'hidden' }}>{playerName}</span>
      <span>{description}</span>
      <span style={style}>{formatNumber(amountWon)}</span>
    </div>
  );
};

export default PlayerResult;
