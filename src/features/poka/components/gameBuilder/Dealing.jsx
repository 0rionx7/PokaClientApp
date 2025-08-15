import { useState } from 'react';

import DealingOptions from '@poka/components/gameBuilder/DealingOptions';
import { BUILDERROWTITLE, DEALINGKIND } from '@utils/text-constants';
import BuilderRow from '@poka/components/gameBuilder/BuilderRow';
import Dilemma from '@poka/components/gameBuilder/Dilemma';

const Dealing = () => {
  const [deny, setDeny] = useState(false);

  return (
    <>
      <BuilderRow
        title={BUILDERROWTITLE.DEALING}
        element={
          <Dilemma
            name="dealing"
            options={[DEALINGKIND.ENA_ENA, DEALINGKIND.OLA_MAZI]}
            setDeny={setDeny}
          />
        }
      />
      <BuilderRow
        title={BUILDERROWTITLE.DEALING_OPTIONS}
        element={<DealingOptions deny={deny} setDeny={setDeny} />}
      />
    </>
  );
};

export default Dealing;
