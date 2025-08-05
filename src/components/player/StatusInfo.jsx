import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/poka/pokaApi';
import ToolTip from 'components/ui/ToolTip';

const StatusInfo = ({ playerState }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);

  const lastAtList = data.playerStates.at(-1).playerName;
  const playerDeals = playerState.playerName === (data.dealer || lastAtList);

  return (
    <>
      {playerDeals && (
        <>
          <div className="dealer">D</div>
          <ToolTip info='"Ντίιλερ"' />
        </>
      )}
      {playerState.sittingOut && <div className="fold">απών</div>}
      {!playerState.isInGame &&
        !playerState.sittingOut &&
        (playerState.resta > 0 ? (
          <div className="fold">πάσο</div>
        ) : (
          <div className="fold">ταπί</div>
        ))}
    </>
  );
};

export default StatusInfo;
