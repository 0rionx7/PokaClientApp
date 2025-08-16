import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRoomContext } from '@poka/components/RoomContext';
import { useGetPokaStateQuery } from '@poka/api/pokaApi.js';
import { isPlayerState } from '@utils/helper-functions.js';
import { DEAL_DELAY } from '@poka/utils/games';

const useDelayedDeal = ({ playerState }) => {
  const { gameId } = useParams();
  const {
    data: { playerStates, dealer },
  } = useGetPokaStateQuery(gameId);
  const { playerName, handCards } = playerState;
  const [dealtCards, setDealtCards] = useState([]);
  const [dealingIndex, setDealingIndex] = useState(0);
  const [firstDealt, setFirstDealt] = useState(false);
  const { setIsDealing } = useRoomContext();

  const activePlayers = playerStates.filter(ps => ps.isInGame);
  const turnOrder = activePlayers.findIndex(isPlayerState(playerName));
  const dealingCard = handCards.at(dealingIndex);
  const interval = activePlayers.length * DEAL_DELAY;
  const delay = (turnOrder + 1) * DEAL_DELAY;

  useEffect(() => {
    if (dealingCard === undefined || firstDealt) return;
    setIsDealing(true);
    const timer = setTimeout(() => {
      setDealtCards(prev => [...prev, dealingCard]);
      setDealingIndex(prev => prev + 1);
      setFirstDealt(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [dealingCard, delay, firstDealt, setIsDealing]);

  useEffect(() => {
    if (dealingCard === undefined || !firstDealt) return;
    setIsDealing(true);
    const timer = setTimeout(() => {
      setDealtCards(prev => [...prev, dealingCard]);
      setDealingIndex(prev => prev + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [dealingCard, firstDealt, interval, setIsDealing]);

  useEffect(() => {
    if (dealingCard === undefined) {
      const timer = setTimeout(() => {
        setIsDealing(false);
      }, interval - delay);

      return () => clearTimeout(timer);
    }
  }, [setIsDealing, dealingCard, interval, delay]);
  // for skarto and swap
  useEffect(() => {
    if (handCards.length <= dealtCards.length) setDealtCards(handCards);
  }, [dealtCards.length, handCards]);

  useEffect(() => {
    if (dealer) {
      setDealtCards([]);
      setDealingIndex(0);
    }
  }, [dealer]);

  useEffect(() => {
    setFirstDealt(false);
  }, [handCards]);

  return dealtCards;
};

export default useDelayedDeal;
