import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { selectNextPlayers, useGetPokaStateQuery } from '@poka/api/pokaApi.js';
import { useRoomContext } from '@poka/components/RoomContext';
import { isPlayerState } from '@utils/helper-functions.js';
import { DEAL_DELAY } from '@poka/utils/games';
import { useSelector } from 'react-redux';

const useDelayedDeal = ({ playerState }) => {
  const { gameId } = useParams();
  const {
    data: { playerStates, dealer },
  } = useGetPokaStateQuery(gameId);
  const [currentPlayer] = useSelector(selectNextPlayers(gameId));
  const [dealtCards, setDealtCards] = useState([]);
  const [dealingIndex, setDealingIndex] = useState(0);
  const [firstDealt, setFirstDealt] = useState(false);

  const { setIsDealing } = useRoomContext();

  const { playerName, handCards, submittedHand } = playerState;

  const handSubmitted = playerState.submittedHand.length;
  const activePlayers = playerStates.filter(ps => ps.isInGame);
  const turnOrder = activePlayers.findIndex(isPlayerState(playerName));
  const dealingCard = handCards.at(dealingIndex);
  const interval = activePlayers.length * DEAL_DELAY;
  const playerDelay = (turnOrder + 1) * DEAL_DELAY;

  const displayedCards = handSubmitted ? submittedHand : dealtCards;
  const noDeal = dealingCard === undefined || playerDelay === 0; //second check for player leaving before deal ends

  useEffect(() => {
    if (noDeal || firstDealt) return;
    setIsDealing(true);
    const timer = setTimeout(() => {
      setDealtCards(prev => [...prev, dealingCard]);
      setDealingIndex(prev => prev + 1);
      setFirstDealt(true);
    }, playerDelay);

    return () => clearTimeout(timer);
  }, [dealingCard, playerDelay, firstDealt, setIsDealing, noDeal]);

  useEffect(() => {
    if (noDeal || !firstDealt) return;
    setIsDealing(true);
    const timer = setTimeout(() => {
      setDealtCards(prev => [...prev, dealingCard]);
      setDealingIndex(prev => prev + 1);
    }, interval);

    return () => clearTimeout(timer);
  }, [dealingCard, firstDealt, interval, setIsDealing, noDeal]);

  useEffect(() => {
    setFirstDealt(false);
  }, [handCards]);

  useEffect(() => {
    if (noDeal) {
      const timer = setTimeout(() => {
        setIsDealing(false);
      }, interval - playerDelay);

      return () => clearTimeout(timer);
    }
  }, [setIsDealing, interval, playerDelay, noDeal]);
  // reseting on game end
  // for skarto , changed cards and show reveald cards
  useEffect(() => {
    if (handCards.length <= dealtCards.length) setDealtCards(handCards);
  }, [dealtCards.length, handCards, currentPlayer?.handInfo?.kind]);

  useEffect(() => {
    if (dealer) {
      setDealtCards([]);
      setDealingIndex(0);
    }
  }, [dealer]);

  return displayedCards;
};

export default useDelayedDeal;
