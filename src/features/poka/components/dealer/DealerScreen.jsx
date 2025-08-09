import {
  useGetPokaStateQuery,
  useGetPokaRequestsQuery,
  useJoinTableMutation,
  useRejectRequestMutation,
} from '@poka/api/pokaApi';
import GameBuilderContextProvider from '@poka/components/gameBuilder/useGameBuilderContext';
import PlayerRequests from '@components/joinRequests/PlayerRequests';
import GameBuilder from '@poka/components/gameBuilder/GameBuilder';
import Overlay from '@ui/Overlay';
import './DealerScreen.scss';

const DealerScreen = () => {
  return (
    <Overlay className="builder-overlay">
      <GameBuilderContextProvider>
        <GameBuilder />
      </GameBuilderContextProvider>
      <div className="players-info">
        <PlayerRequests
          useGetStateQuery={useGetPokaStateQuery}
          useGetRequestsQuery={useGetPokaRequestsQuery}
          useJoin={useJoinTableMutation}
          useReject={useRejectRequestMutation}
          maxPlayersCount={8}
        />
      </div>
    </Overlay>
  );
};

export default DealerScreen;
