import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import { playerEntry } from '@utils/utilities-functions';
import JokerSelect from '@poka/components/action/JokerSelect';
import DenyAccept from '@poka/components/action/DenyAccept';
import Bet from '@poka/components/action/Bet';
import Swap from '@poka/components/action/Swap';
import Submit from '@poka/components/action/Submit';
import Discard from '@poka/components/action/Discard';

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
      {jokering && <JokerSelect />}
    </>
  );
};

export default Play;
