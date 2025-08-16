import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useRoomContext } from '@poka/components/RoomContext';
import { selectHostPlayerState } from '@poka/api/pokaApi';
import JokerSelect from '@poka/components/action/JokerSelect';
import DenyAccept from '@poka/components/action/DenyAccept';
import Bet from '@poka/components/action/Bet';
import Swap from '@poka/components/action/Swap';
import Submit from '@poka/components/action/Submit';
import Discard from '@poka/components/action/Discard';

const Play = () => {
  const { gameId } = useParams();
  const {
    betting,
    selecting,
    jokerReplacing,
    denying: denialCount,
    bet,
    resta,
  } = useSelector(selectHostPlayerState(gameId));
  const { isDealing } = useRoomContext();

  if (isDealing) return null;

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
