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
import Card from '@poka/components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState }) => {
  const dispatch = useDispatch();
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const chosenCardIndexes = useSelector(selectChosenHandCardIndexes);
  const displayedCards = useDelayedDeal({ playerState });

  const { playerName, selecting } = playerState;
  const handSubmitted = playerState.submittedHand.length;
  const isHostPlayer = playerName === hostPlayerName;

  const handClass = `hand-cards cards-${displayedCards?.length}`;

  const isChosen = index =>
    isHostPlayer && chosenCardIndexes.some(i => i === index);
  const isJoker = value => data.joker.some(v => v === value) && !handSubmitted;

  const handleSelectCard = index => {
    const canBeChosen = isHostPlayer && selecting && !handSubmitted;
    if (canBeChosen) dispatch(toggleChosenCard({ place: 'hand', index }));
  };

  return (
    <>
      <div className={handClass}>
        {displayedCards?.map((card, i) => (
          <Card
            key={card?.value + card?.suit || i}
            card={card}
            onSelect={() => handleSelectCard(i)}
            isChosen={isChosen(i)}
            isJoker={isJoker(card?.value)}
          />
        ))}
      </div>
    </>
  );
};

export default memo(HandCards);
