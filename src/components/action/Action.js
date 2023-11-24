import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameApi/gameApi';
import { playerEntry } from 'common/utilities-functions';
import NextRound from 'components/action/NextRound';
import Results from 'components/action/Results';
import LiveInfo from 'components/action/LiveInfo';
import Play from 'components/action/Play';
import Renew from 'components/action/Renew';
import './Action.scss';

const Action = ({ hideInfo }) => {
  const { gameId } = useParams();
  const hostPlayerName = useSelector(state => state.auth.username);
  const { hostPlayerState, currentPlayerStateList, dealer } =
    useGetGameStateQuery(gameId, {
      selectFromResult: ({ data }) => ({
        hostPlayerState: data.playersStateList.find(
          playerEntry(hostPlayerName)
        ),
        currentPlayerStateList: data.currentPlayerStateList,
        dealer: data.dealer,
      }),
    });

  const [currentPlayer] = currentPlayerStateList;
  const hostTurn = currentPlayer?.playerName === hostPlayerName;

  if (!gameId) return null;
  return (
    <div className={'action-container ' + (hideInfo ? 'full-width' : '')}>
      {hostTurn ? (
        <Play />
      ) : (
        !dealer && !currentPlayer?.handInfo?.kind && <LiveInfo />
      )}
      {currentPlayer?.handInfo?.kind && <Results />}
      {hostPlayerState.resta === 0 && !hostPlayerState.sittingOut && <Renew />}
      {hostPlayerState.resta > 0 && currentPlayer?.handInfo?.kind && (
        <NextRound />
      )}
    </div>
  );
};

export default Action;
