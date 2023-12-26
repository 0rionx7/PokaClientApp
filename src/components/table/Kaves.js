import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createChipStack } from 'lib/createChipStack';
import Kava from 'components/table/Kava';
import './Kaves.scss';

const Kaves = ({ totalPot, rows }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const chips = createChipStack(totalPot, data.chip);
  const showKaves = data.kaves[0]?.amount < totalPot;
  const kavesClass = 'kaves ' + (rows && rows % 2 === 0 && 'shift');

  return (
    <div className={kavesClass}>
      <div className="chips">{chips}</div>
      <div className="pot">ποτ: {totalPot.toLocaleString()}</div>
      {showKaves &&
        data.kaves.map((kavaInfo, i) => <Kava kavaInfo={kavaInfo} key={i} />)}
    </div>
  );
};

export default Kaves;
