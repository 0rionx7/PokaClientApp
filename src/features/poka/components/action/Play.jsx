import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { selectHostPlayerState } from '@poka/api/pokaApi';
import JokerSelect from '@poka/components/action/JokerSelect';
import DenyAccept from '@poka/components/action/DenyAccept';
import Bet from '@poka/components/action/Bet';
import Swap from '@poka/components/action/Swap';
import Submit from '@poka/components/action/Submit';
import Discard from '@poka/components/action/Discard';

const Play = () => {
  const { gameId } = useParams();
  const hostPlayerState = useSelector(selectHostPlayerState(gameId));

  const betting = hostPlayerState.betting;
  const swapping = hostPlayerState.selecting?.swaps;
  const submitting = hostPlayerState.selecting?.submit;
  const discarding = hostPlayerState.selecting?.discard;
  const jokerReplacing = hostPlayerState.jokerReplacing;
  const denials = hostPlayerState.denying > 0;
  const denying =
    denials && ![betting, swapping, submitting, discarding].some(Boolean);

  return (
    <>
      {betting && (
        <Bet bet={hostPlayerState.bet} resta={hostPlayerState.resta} />
      )}
      {swapping && <Swap selecting={hostPlayerState.selecting} />}
      {discarding && <Discard selecting={hostPlayerState.selecting} />}
      {submitting && <Submit />}
      {denying && <DenyAccept />}
      {jokerReplacing && <JokerSelect />}
    </>
  );
};

export default Play;
