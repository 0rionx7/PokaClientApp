import { memo, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectHandcards } from '@poka/slice/pokaStateSlice';
import { selectUserName } from '@account/slice/accountSlice';
import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import useDelayedDeal from '@poka/hooks/useDelayedDeal';
import { playerEntry } from '@utils/utilities-functions';
import ChipStack from '@poka/components/player/ChipStack';
import Card from '@poka/components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState, index }) => {
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerHandCards = useSelector(selectHandcards);
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);

  const hostPlayerState = useMemo(
    () => data?.playerStates.find(playerEntry(hostPlayerName)),
    [data?.playerStates, hostPlayerName]
  );
  const isHostPlayer = playerState.playerName === hostPlayerName;
  const playerSubmitted = playerState.submittedHand.length;
  const handCards = playerSubmitted
    ? playerState.submittedHand
    : isHostPlayer
    ? hostPlayerHandCards
    : playerState.handCards;
  const dealtHandCards = useDelayedDeal({ handCards, index });
  const canSelect = hostPlayerState.selecting;
  const className = `hand-cards cards-${handCards?.filter(Boolean).length}`;

  return (
    <div className={className}>
      {dealtHandCards?.map((card, i) => (
        <Card
          key={i}
          card={card}
          canBeSelected={!playerSubmitted && isHostPlayer && canSelect}
          noColor={playerSubmitted}
        />
      ))}
      <ChipStack playerState={playerState} />
    </div>
  );
};

export default memo(HandCards);
