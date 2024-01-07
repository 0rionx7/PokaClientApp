import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';

const useTimerBar = playerState => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const [width, setWidth] = useState(100);

  const { playerName, handInfo } = playerState;
  const [currentPlayerState] = data?.currentPlayerList;
  const isActive = currentPlayerState?.playerName === playerName;
  const submitting = currentPlayerState?.selecting?.submit;

  useEffect(() => {
    let timer;
    const period = data?.reaction * (submitting ? 20 : 10);
    if (isActive && !handInfo.kind && data?.reaction !== 101 && width > 0) {
      timer = setInterval(() => setWidth(pre => pre - 1), period);
    }

    return () => clearInterval(timer);
  }, [isActive, handInfo.kind, width, data?.reaction, submitting]);

  useEffect(() => setWidth(100), [isActive]);

  const backgroundColor = width > 50 ? 'green' : width > 20 ? 'orange' : 'red';

  return (
    <div className="timer-bar">
      {isActive && (
        <div
          className="timer-fragment"
          style={{ width: width + '%', backgroundColor }}
        />
      )}
      <div className="line" />
    </div>
  );
};

export default useTimerBar;
