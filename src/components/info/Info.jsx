import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import GameDescription from 'components/info/GameDescription';
import { useEmoji } from 'components/info/chat/EmojiProvider';
import { collapseVertical } from 'assets/svgs/various';
import { infoButton } from 'utils/text-constants';
import Standings from 'components/info/Standings';
import Results from 'components/info/Results';
import GameInfo from 'components/info/GameInfo';
import ChatBox from 'components/info/chat/ChatBox';
import Buttons from 'components/info/Buttons';
import './Info.scss';

const Info = ({ hideInfo, onToggleInfoPanel }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(selectPlayername);
  const [selectedTab, setSelectedTab] = useState(infoButton.GAME_DESCRIPTION);
  const { setShowPicker } = useEmoji();

  useEffect(() => {
    if (data.dealer === hostPlayerName)
      setSelectedTab(infoButton.GAME_DESCRIPTION);
  }, [setSelectedTab, data.dealer, hostPlayerName]);

  const handleToggleInfoPanel = () => {
    onToggleInfoPanel();
    setShowPicker(false);
  };

  return (
    <div className="info">
      <div className={'info-content ' + (hideInfo ? 'hidden' : '')}>
        <Buttons setSelected={setSelectedTab} selected={selectedTab} />
        {selectedTab === infoButton.GAME_DESCRIPTION && <GameDescription />}
        {selectedTab === infoButton.GAME_INFO && <GameInfo />}
        {selectedTab === infoButton.CHAT && <ChatBox />}
        {selectedTab === infoButton.STANDINGS && <Standings />}
        {selectedTab === infoButton.LAST_GAME_RESULTS && <Results />}
      </div>
      <div className="toggle-btn" onClick={handleToggleInfoPanel}>
        {collapseVertical}
      </div>
    </div>
  );
};

export default Info;
