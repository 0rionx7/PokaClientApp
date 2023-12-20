import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import Kava from 'components/table/Kava';

const Kaves = ({ totalPot, rows }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const showKaves =
    data.kaves[0] && +Object.keys(data.kaves[0])[0] !== totalPot;
  const kavesClass = 'kaves ' + (rows && rows % 2 === 0 && 'shift');

  return (
    <div className={kavesClass}>
      <div className="pot">ποτ: {totalPot.toLocaleString()}</div>
      {showKaves &&
        data.kaves.map((kavaInfo, i) => <Kava kavaInfo={kavaInfo} key={i} />)}
    </div>
  );
};

export default Kaves;
