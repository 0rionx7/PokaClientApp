import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { calculateChipCounts } from '@poka/utils/calculateChipCounts';
import { formatNumber } from '@utils/helper-functions';
import Stack from '@poka/components/player/Stack';
import { INFO_TEXT } from '@utils/text-constants';
import Kava from '@poka/components/table/Kava';
import ToolTip from '@ui/ToolTip';
import './Kaves.scss';

const Kaves = ({ totalPot }) => {
  const { data } = useGetPokaStateQuery();

  const { chip, kaves } = data;
  const chipInfos = calculateChipCounts(totalPot, chip);
  const showKaves = kaves[0]?.amount < totalPot;

  return (
    <div className="kaves ">
      <div className="chips">
        {chipInfos.map((chipInfo) => (
          <Stack key={chipInfo[0]} chipInfo={chipInfo} />
        ))}
      </div>
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
