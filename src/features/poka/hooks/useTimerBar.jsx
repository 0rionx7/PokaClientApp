import { useEffect, useState } from 'react';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';

const useTimerBar = (playerState) => {
  const { data } = useGetPokaStateQuery();
  const [width, setWidth] = useState(100);

  const { playerName, handInfo } = playerState;
  const { nextPlayers, reaction } = data;
  const [currentPlayerState] = nextPlayers;
  const isActive = currentPlayerState?.playerName === playerName;
  const submitting = currentPlayerState?.selecting?.submit;
  const shouldRun = isActive && !handInfo.kind && reaction !== 101;
  const period = reaction * (submitting ? 20 : 10);

  useEffect(() => {
    if (!shouldRun) return;
    const timer = setInterval(() => {
      setWidth((perv) => {
        if (perv === 0) {
          clearInterval(timer);
          return 0;
        }
        return perv - 1;
      });
    }, period);

    return () => clearInterval(timer);
  }, [shouldRun, period]);

  useEffect(() => setWidth(100), [isActive]);

  const backgroundColor = width > 50 ? 'green' : width > 20 ? 'orange' : 'red';

  return (
    <div className="timer-bar">
      {isActive && !playerState.handInfo.kind && (
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
