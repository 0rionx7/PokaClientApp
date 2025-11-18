import GameBuilderContextProvider from '@poka/components/gameBuilder/useGameBuilderContext'
import { useGetPokaStateQuery } from '@poka/api/pokaApi'
import PlayerRequests from '@components/requests/PlayerRequests'
import GameBuilder from '@poka/components/gameBuilder/GameBuilder'
import Overlay from '@ui/Overlay'
import './DealerScreen.scss'

const DealerScreen = () => {
  return (
    <Overlay className="builder-overlay">
      <GameBuilderContextProvider>
        <GameBuilder />
      </GameBuilderContextProvider>
      <div className="players-info">
        <PlayerRequests useGetStateQuery={useGetPokaStateQuery} maxPlayersCount={8} />
      </div>
    </Overlay>
  )
}

export default DealerScreen
