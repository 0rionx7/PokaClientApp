import { useSelector } from 'react-redux';

import { selectHostPlayerState } from '@poka/api/pokaApi';
import JokerSelect from '@poka/components/action/JokerSelect';
import DenyAccept from '@poka/components/action/DenyAccept';
import Bet from '@poka/components/action/Bet';
import Swap from '@poka/components/action/Swap';
import Submit from '@poka/components/action/Submit';
import Discard from '@poka/components/action/Discard';

const Play = () => {
  const {
    betting,
    selecting,
    jokerReplacing,
    denying: denialCount,
    bet,
    resta,
  } = useSelector(selectHostPlayerState);

  const { swaps, submit, discard } = selecting || {};
  const denials = denialCount > 0;
  const denying = denials && ![betting, swaps, submit, discard].some(Boolean);

  return (
    <>
      {betting && <Bet bet={bet} resta={resta} />}
      {swaps && <Swap selecting={selecting} />}
      {discard && <Discard selecting={selecting} />}
      {submit && <Submit />}
      {denying && <DenyAccept />}
      {jokerReplacing && <JokerSelect />}
    </>
  );
};

export default Play;
