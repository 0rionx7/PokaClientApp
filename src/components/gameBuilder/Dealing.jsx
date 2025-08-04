import { useState } from 'react';

import DealingOptions from 'components/gameBuilder/DealingOptions';
import { builderRowTitle, dealingType } from 'utils/text-constants';
import BuilderRow from 'components/gameBuilder/BuilderRow';
import Dilemma from 'components/gameBuilder/Dilemma';

const Dealing = () => {
  const [deny, setDeny] = useState(false);

  return (
    <>
      <BuilderRow
        title={builderRowTitle.DEALING}
        element={
          <Dilemma
            name="dealing"
            options={[dealingType.ENA_ENA, dealingType.OLA_MAZI]}
            setDeny={setDeny}
          />
        }
      />
      <BuilderRow
        title={builderRowTitle.DEALING_OPTIONS}
        element={<DealingOptions deny={deny} setDeny={setDeny} />}
      />
    </>
  );
};

export default Dealing;
