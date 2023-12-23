import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';

const Chip = ({ multiplier, index }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const value = multiplier * data.chip;
  const displayValue = value >= 1000 ? value / 1000 + 'K' : value;

  const color =
    multiplier === 1
      ? 'green'
      : multiplier === 5
      ? 'black'
      : multiplier === 25
      ? 'yellow'
      : multiplier === 100
      ? 'red'
      : multiplier === 1000
      ? 'blue'
      : 'purple';
  const style = {
    bottom: 3 * index + 'px',
    gridArea: color === 'black' ? 'green' : color,
  };

  return (
    <div className="chip" style={style}>
      <img src={require(`assets/chips/${color}.png`)} alt="chip" />
      <span style={{ bottom: '.6rem' }}>{displayValue}</span>
    </div>
  );
};

export default Chip;
