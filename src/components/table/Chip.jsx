import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import { createChipStyle } from 'utils/createChipStyle';
import './Chip.scss';

const Chip = ({ multiplier, index, startIndex }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const { color, style } = useMemo(
    () => createChipStyle(multiplier, index, startIndex),
    [multiplier, index, startIndex]
  );
  const value = multiplier * data.chip;
  const displayValue = value >= 1000 ? value / 1000 + 'K' : value;

  return (
    <div className="chip" style={style}>
      <img
        src={`${import.meta.env.VITE_IMAGE_URL}/assets/chips/${color}.png`}
        alt="chip"
      />
      <span style={{ bottom: '.6rem' }}>{displayValue}</span>
    </div>
  );
};

export default Chip;
