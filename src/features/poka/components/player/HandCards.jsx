import { memo, useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetPokaStateQuery } from 'poka/api/pokaApi';
import { selectHandcards } from 'poka/slice/pokaStateSlice';
import { selectUserName } from 'account/slice/accountSlice';
import { playerEntry } from 'utils/utilities-functions';
import ChipStack from 'poka/components/player/ChipStack';
import Card from 'poka/components/card/Card';
import './HandCards.scss';

const HandCards = ({ playerState, playingIndex, chipsPosition }) => {
  const hostPlayerName = useSelector(selectUserName);
  const hostPlayerHandCards = useSelector(selectHandcards);
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const [renderCards, setRenderCards] = useState([]);

  const hostPlayerState = useMemo(
    () => data?.playerStates.find(playerEntry(hostPlayerName)),
    [data?.playerStates, hostPlayerName]
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
