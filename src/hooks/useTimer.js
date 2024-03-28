import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateQuery,
  useTimedOutMutation,
} from 'features/gameState/gameStateApi';
import Timer from 'componentsChinese/Timer';
import { isSeated } from 'utils/utilities-functions';

const useTimer = playerName => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const { currentPlayerList, round, playersStateList, initialPlayTime } = data;
  const [remainingTime, setRemainingTime] = useState(initialPlayTime);
  const username = useSelector(state => state.account.username);
  const [timedOut] = useTimedOutMutation();

  const isHostBoard = playerName === username;
  const [currentPlayer] = currentPlayerList;
  const roundEnd =
    currentPlayerList.length === playersStateList.filter(isSeated).length;
  const isActive = playerName === currentPlayer;

  useEffect(() => {
    if (isActive && !roundEnd) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, roundEnd]);

  useEffect(() => {
    if (remainingTime === 0 && isHostBoard) {
      timedOut(gameId);
    }
  }, [remainingTime, isHostBoard, timedOut, gameId]);

  useEffect(() => {
    setRemainingTime(initialPlayTime);
  }, [round, initialPlayTime]);

  return <Timer time={remainingTime} isActive={isActive} />;
};

export default useTimer;
