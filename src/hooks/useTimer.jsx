import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetGameStateChineseQuery,
  useTimedOutMutation,
} from 'features/chinese/chineseApi';
import { selectUserName } from 'features/account/accountSlice';
import Timer from 'componentsChinese/Timer';
import { isSitting } from 'utils/utilities-functions';

const useTimer = playerName => {
  const { gameId } = useParams();
  const { data } = useGetGameStateChineseQuery(gameId);
  const { currentPlayerList, round, playerStates, playTime } = data;
  const [remainingTime, setRemainingTime] = useState(playTime);
  const username = useSelector(selectUserName);
  const [timedOut] = useTimedOutMutation();

  const isHostBoard = playerName === username;
  const [currentPlayer] = currentPlayerList;
  const isRoundEnd =
    currentPlayerList.length <= playerStates.filter(isSitting).length;
  const isActive = playerName === currentPlayer;

  useEffect(() => {
    if (isActive && !isRoundEnd) {
      const timer = setInterval(() => {
        setRemainingTime(prev => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, isRoundEnd]);

  useEffect(() => {
    if (remainingTime === 0 && isHostBoard) {
      timedOut(gameId);
    }
  }, [remainingTime, isHostBoard, timedOut, gameId]);

  useEffect(() => {
    setRemainingTime(playTime);
  }, [round, playTime]);

  return <Timer time={remainingTime} isActive={isActive} />;
};

export default useTimer;
