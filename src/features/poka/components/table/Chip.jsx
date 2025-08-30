import { useMemo } from 'react';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { createChipStyle } from '@poka/utils/createChipStyle';
import './Chip.scss';

const Chip = ({ multiplier, index, startIndex }) => {
  const {
    data: { chip },
  } = useGetPokaStateQuery();

  const { color, style } = useMemo(
    () => createChipStyle(multiplier, index, startIndex),
    [multiplier, index, startIndex]
  );
  const value = multiplier * chip;
  const displayValue = value >= 1000 ? `${value / 1000}K` : value;

  return (
    <div className="chip" style={style}>
      <img src={`/chipImages/${color}.png`} alt="chip" />
      <span style={{ bottom: '.6rem' }}>{displayValue}</span>
    </div>
  );
};

export default Chip;
