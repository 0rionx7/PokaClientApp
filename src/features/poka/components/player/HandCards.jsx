import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectChosenHandCardIndexes,
  toggleChosenCard,
} from '@poka/slice/pokaStateSlice';
import { selectUserName } from '@account/slice/accountSlice';
import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import useDelayedDeal from '@poka/hooks/useDelayedDeal';
import ChipStack from '@poka/components/player/ChipStack';
import Card from '@poka/components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const chosenCardIndexes = useSelector(selectChosenHandCardIndexes);

  const { playerName, selecting } = playerState;
  const displayedCards = useDelayedDeal({ playerState });
  const dispatch = useDispatch();

  const handSubmitted = playerState.submittedHand.length;
  const isHostPlayer = playerName === hostPlayerName;

  const className = `hand-cards cards-${
    displayedCards?.filter(Boolean).length
  }`;

  const isChosen = index =>
    isHostPlayer && chosenCardIndexes.some(i => i === index);
  const isJoker = value => data.joker.some(v => v === value) && !handSubmitted;

  const handleSelectCard = index => {
    const canBeChosen = isHostPlayer && selecting && !handSubmitted;
    if (canBeChosen) dispatch(toggleChosenCard({ place: 'hand', index }));
  };

  return (
    <div className={className}>
      {displayedCards?.map((card, i) => (
        <Card
          key={card.value + card.suit || i}
          card={card}
          onSelect={() => handleSelectCard(i)}
          isChosen={isChosen(i)}
          isJoker={isJoker(card.value)}
        />
      ))}
      <ChipStack playerState={playerState} />
    </div>
  );
};

export default memo(HandCards);
