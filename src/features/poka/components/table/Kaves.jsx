import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { createChipStack } from '@poka/utils/createChipStack';
import { INFO_TEXT } from '@utils/text-constants';
import ToolTip from '@ui/ToolTip';
import Kava from '@poka/components/table/Kava';
import './Kaves.scss';
import { formatNumber } from '@utils/helper-functions';

const Kaves = ({ totalPot, rows }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const { chip, kaves } = data;
  const chips = createChipStack(totalPot, chip);
  const showKaves = kaves[0]?.amount < totalPot;
  const kavesClass = !rows ? 'center' : rows % 2 === 0 ? 'even' : '';

  return (
    <div className={'kaves ' + kavesClass}>
      <div className="chips">{chips}</div>
      <div className="pot">ποτ: {formatNumber(totalPot)}</div>
      {showKaves && (
        <>
          {kaves.map((kavaInfo, i) => (
            <Kava kavaInfo={kavaInfo} key={i} />
          ))}
          <ToolTip info={INFO_TEXT.KAVES} />
        </>
      )}
    </div>
  );
};

export default Kaves;
