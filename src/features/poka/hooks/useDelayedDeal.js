import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi.js';
import { playerEntry } from '@utils/utilities-functions.js';

const useDelayedDeal = ({ index, handCards }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const [dealtCards, setDealtCards] = useState([]);

  const { playerName } = data?.playerStates.at(index);
  const activePlayers = data?.playerStates.filter(ps =>
    data?.nextPlayers.some(playerEntry(ps.playerName))
  );
  const turnOrder = activePlayers.findIndex(playerEntry(playerName));

  useEffect(() => {
    let timer;
    const timeout = turnOrder * 150;
    timer = setTimeout(() => {
      setDealtCards(handCards);
    }, timeout);

    return () => clearTimeout(timer);
  }, [turnOrder, handCards]);

  return dealtCards;
};

export default useDelayedDeal;
