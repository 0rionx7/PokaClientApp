import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameStateSlice/gameApi';
import useTimerBar from 'hooks/useTimerBar';
import Card from 'components/card/Card';

const PlayerInfo = ({ playerState }) => {
  const { gameId } = useParams();
  const { lastAtList, dealer } = useGetGameStateQuery(gameId, {
    selectFromResult: ({ data }) => ({
      lastAtList: data?.playersStateList.at(-1).playerName,
      dealer: data?.dealer,
    }),
  });
  const timerBar = useTimerBar(playerState);
  const hostPlayerName = useSelector(state => state.auth.username);

  const isHostPlayer = playerState.playerName === hostPlayerName;
  const playerDeals = playerState.playerName === (dealer ? dealer : lastAtList);

  return (
    <div
      className="info-container"
      style={{ backgroundColor: playerState.isInGame ? '#221f1b' : '#a00000' }}>
      <div className="playername">
        {playerDeals && (
          <>
            <div className="dealer">D</div>
            <div className="tool-tip">&quot;Ντίιλερ&quot;</div>
          </>
        )}
        {!playerState.isInGame && !playerState.sittingOut && (
          <div className="fold">πάσο</div>
        )}
        {playerState.playerName}
      </div>
      {timerBar}
      <div className="gameplay-info">
        {!!playerState.swapped && (
          <>
            <span id="swapped"> {playerState.swapped}</span>
            <div className="tool-tip">πραγμ. αλλαγές</div>
          </>
        )}
        {playerState.resta - playerState.bet}
        {playerState.deniedCards.length > 0 && (
          <>
            <span id="denies">{playerState.deniedCards.length}</span>
            <div className="tool-tip">
              ΑΡΝΗΣΕΙΣ
              <div style={{ display: 'flex' }}>
                {playerState.deniedCards.map((card, i) => {
                  if (isHostPlayer) card = { ...card, faceUp: true };
                  return <Card card={card} key={i} />;
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerInfo;
