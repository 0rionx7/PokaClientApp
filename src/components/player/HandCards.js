import { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectHandcards } from 'features/gameState/gameStateSlice';
import { selectPlayername } from 'features/account/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import ChipStack from 'components/player/ChipStack';
import Card from 'components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState, playingIndex, chipsPosition }) => {
  const hostPlayerName = useSelector(selectPlayername);
  const hostPlayerHandCards = useSelector(selectHandcards);
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [renderCards, setRenderCards] = useState([]);

  const hostPlayerState = useMemo(
    () => data?.playersStateList.find(playerEntry(hostPlayerName)),
    [data?.playersStateList, hostPlayerName]
  );
  const isHostPlayer = playerState.playerName === hostPlayerName;
  const playerSubmitted = playerState.submittedHand.length;
  const canSelect = hostPlayerState.selecting;
  const handCards = playerSubmitted
    ? playerState.submittedHand
    : isHostPlayer
    ? hostPlayerHandCards
    : playerState.handCards;

  useEffect(() => {
    let timer;
    const timeout = playingIndex * 120;
    timer = setTimeout(() => {
      setRenderCards(handCards);
    }, timeout);

    return () => clearTimeout(timer);
  }, [playingIndex, handCards]);

  return (
    <div className={'hand-cards cards-' + handCards?.length}>
      {renderCards?.map((card, i) => (
        <Card
          key={i}
          card={card}
          canBeSelected={!playerSubmitted && isHostPlayer && canSelect}
          noColor={playerSubmitted}
        />
      ))}
      <ChipStack playerState={playerState} chipsPosition={chipsPosition} />
    </div>
  );
};

export default memo(HandCards);
