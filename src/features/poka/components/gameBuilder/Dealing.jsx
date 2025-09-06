import { useState } from 'react';

import DealingOptions from '@poka/components/gameBuilder/DealingOptions';
import { BUILDER_ROW_TITLE, DEALING_KIND } from '@utils/text-constants';
import BuilderRow from '@poka/components/gameBuilder/BuilderRow';
import Dilemma from '@poka/components/gameBuilder/Dilemma';

const Dealing = () => {
  const [deny, setDeny] = useState(false);

  return (
    <>
      <BuilderRow
        title={BUILDER_ROW_TITLE.DEALING}
        element={
          <Dilemma
            name="dealing"
            options={[DEALING_KIND.ENA_ENA, DEALING_KIND.OLA_MAZI]}
            setDeny={setDeny}
          />
        }
      />
      <BuilderRow
        title={BUILDER_ROW_TITLE.DEALING_OPTIONS}
        element={<DealingOptions deny={deny} setDeny={setDeny} />}
      />
    </>
  );
};

export default Dealing;
