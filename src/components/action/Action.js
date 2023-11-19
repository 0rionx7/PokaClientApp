import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'src/features/gameApi/gameApi';
import { playerEntry } from 'src/common/utilities-functions';
import NextRound from 'src/components/action/NextRound';
import Results from 'src/components/action/Results';
import LiveInfo from 'src/components/action/LiveInfo';
import Play from 'src/components/action/Play';
import Renew from 'src/components/action/Renew';
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
