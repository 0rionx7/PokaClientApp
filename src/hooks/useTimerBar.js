import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';

const emptyList = [];

const useTimerBar = playerState => {
  const { gameId } = useParams();
  const { currentPlayerStateList, reaction } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      currentPlayerStateList: data?.currentPlayerStateList || emptyList,
      reaction: data?.reaction,
    }),
  });
  const { playerName, handInfo } = playerState;
  const [currentPlayerState] = currentPlayerStateList;
  const isActive = currentPlayerState?.playerName === playerName;
  const submitting = currentPlayerState?.selecting?.submit;
  const [width, setWidth] = useState(100);

  useEffect(() => {
    let timer;
    const period = reaction * (submitting ? 20 : 10);
    if (isActive && !handInfo.kind && width > 0) {
      timer = setInterval(() => setWidth(pre => pre - 1), period);
    }

    return () => clearInterval(timer);
  }, [isActive, handInfo.kind, width, reaction, submitting]);

  useEffect(() => setWidth(100), [isActive]);

  const timerColor = width > 50 ? 'green' : width > 20 ? 'orange' : 'red';

  return (
    <div className="timer-bar">
      {isActive && (
        <div
          className="timer-fragment"
          style={{ width: width + '%', backgroundColor: timerColor }}
        />
      )}
      <div className="line" />
    </div>
  );
};

export default useTimerBar;
