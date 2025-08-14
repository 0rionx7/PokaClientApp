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

const HandCards = ({ playerState, index }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const chosenCardIndexes = useSelector(selectChosenHandCardIndexes);
  const dispatch = useDispatch();

  const handSubmitted = playerState.submittedHand.length;
  const handCards = handSubmitted
    ? playerState.submittedHand
    : playerState.handCards;
  const isHostPlayer = playerState.playerName === hostPlayerName;
  // const dealtHandCards = useDelayedDeal({ handCards, index });
  const selecting = playerState.selecting;
  const className = `hand-cards cards-${handCards?.filter(Boolean).length}`;

  const isChosen = index =>
    isHostPlayer && chosenCardIndexes.some(i => i === index);
  const isJoker = value => data.joker.some(v => v === value) && !handSubmitted;

  const handleChooseCard = index => {
    const canBeChosen = isHostPlayer && selecting && !handSubmitted;
    if (canBeChosen) dispatch(toggleChosenCard({ place: 'hand', index }));
  };

  return (
    <div className={className}>
      {handCards?.map((card, i) => (
        <Card
          key={card.value + card.suit || i}
          card={card}
          onChoose={() => handleChooseCard(i)}
          isChosen={isChosen(i)}
          isJoker={isJoker(card.value)}
        />
      ))}
      <ChipStack playerState={playerState} />
    </div>
  );
};

export default memo(HandCards);
