import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { createChipStack } from 'utils/createChipStack';
import { infoText } from 'utils/text-constants';
import ToolTip from 'components/ui/ToolTip';
import Kava from 'components/table/Kava';
import './Kaves.scss';

const Kaves = ({ totalPot, rows }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const chips = createChipStack(totalPot, data.chip);
  const showKaves = data.kaves[0]?.amount < totalPot;
  const kavesClass = !rows ? 'center' : rows % 2 === 0 ? 'even' : '';

  return (
    <div className={'kaves ' + kavesClass}>
      <div className="chips">{chips}</div>
      <div className="pot">ποτ: {totalPot.toLocaleString()}</div>
      {showKaves && (
        <>
          {data.kaves.map((kavaInfo, i) => (
            <Kava kavaInfo={kavaInfo} key={i} />
          ))}
          <ToolTip info={infoText.KAVES} />
        </>
      )}
    </div>
  );
};

export default Kaves;
