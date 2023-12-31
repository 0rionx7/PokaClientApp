import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'common/utilities-functions';
import DenyAccept from 'components/action/DenyAccept';
import Bet from 'components/action/Bet';
import Swap from 'components/action/Swap';
import Submit from 'components/action/Submit';
import Discard from 'components/action/Discard';
import JokerSelect from 'components/action/JokerSelect';
import './Action.scss';

const Play = () => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.account.username);
  const { data } = useGetGameStateQuery(gameId);

  const hostPlayerState = useMemo(
    () => data?.playersStateList.find(playerEntry(hostPlayerName)),
    [data?.playersStateList, hostPlayerName]
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
