import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from 'features/poka/pokaApi';
import { selectUserName } from 'features/account/slice/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import JokerSelect from 'components/action/JokerSelect';
import DenyAccept from 'components/action/DenyAccept';
import Bet from 'components/action/Bet';
import Swap from 'components/action/Swap';
import Submit from 'components/action/Submit';
import Discard from 'components/action/Discard';

const Play = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(selectUserName);
  const { data } = useGetPokaStateQuery(gameId);

  const hostPlayerState = useMemo(
    () => data?.playerStates.find(playerEntry(hostPlayerName)),
    [data?.playerStates, hostPlayerName]
  );
  const betting = hostPlayerState.betting;
  const swapping = hostPlayerState.selecting?.swaps;
  const submitting = hostPlayerState.selecting?.submit;
  const discarding = hostPlayerState.selecting?.discard;
  const jokering = hostPlayerState.jokering;
  const denies = hostPlayerState.denying > 0;
  const deny =
    denies && ![betting, swapping, submitting, discarding].some(Boolean);

  return (
    <>
      {betting && (
        <Bet bet={hostPlayerState.bet} resta={hostPlayerState.resta} />
      )}
      {swapping && <Swap selecting={hostPlayerState.selecting} />}
      {discarding && <Discard selecting={hostPlayerState.selecting} />}
      {submitting && <Submit />}
      {deny && <DenyAccept />}
      {jokering && <JokerSelect />}
    </>
  );
};

export default Play;
