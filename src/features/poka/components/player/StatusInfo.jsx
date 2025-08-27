import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import ToolTip from '@ui/ToolTip';

const StatusInfo = ({ playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const { sittingOut, isInGame, resta } = playerState;

  const { playerStates, dealer } = data;
  const lastAtList = playerStates.at(-1).playerName;
  const playerDeals = playerState.playerName === (dealer || lastAtList);

  return (
    <>
      {playerDeals && (
        <>
          <div className="dealer">D</div>
          <ToolTip info='"Ντίιλερ"' />
        </>
      )}
      {sittingOut && <div className="fold">απών</div>}
      {!isInGame && !sittingOut && (
        <div className="fold">{resta > 0 ? 'πάσο' : 'ταπί'}</div>
      )}
    </>
  );
};

export default StatusInfo;
