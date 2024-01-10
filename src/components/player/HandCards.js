import { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { playerEntry } from 'lib/utilities-functions';
import ChipStack from 'components/player/ChipStack';
import Card from 'components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState, playingIndex, chipsPosition }) => {
  const hostPlayerName = useSelector(state => state.account.username);
  const hostPlayerHandCards = useSelector(state => state.gameState.handCards);
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
    const timeout = playingIndex * 60;
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
        />
      ))}
      <ChipStack playerState={playerState} chipsPosition={chipsPosition} />
    </div>
  );
};

export default memo(HandCards);
