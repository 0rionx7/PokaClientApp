import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  useGetChineseStateQuery,
  useTimedOutMutation,
} from '@chinese/api/chineseApi';
import { selectUserName } from '@account/slice/accountSlice';
import Timer from '@chinese/components/table/Timer';
import { isSitting } from '@utils/utilities-functions';

const useTimer = playerName => {
  const { gameId } = useParams();
  const { data } = useGetChineseStateQuery(gameId);
  const { nextPlayers, round, playerStates, playTime } = data;
  const [remainingTime, setRemainingTime] = useState(playTime);
  const username = useSelector(selectUserName);
  const [timedOut] = useTimedOutMutation();

  const isHostBoard = playerName === username;
  const [currentPlayer] = nextPlayers;
  const isRoundEnd =
    nextPlayers.length <= playerStates.filter(isSitting).length;
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
