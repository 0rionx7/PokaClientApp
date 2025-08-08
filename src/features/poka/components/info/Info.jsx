import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import GameDescription from '@poka/components/info/GameDescription';
import { useEmoji } from '@components/chat/EmojiProvider';
import { infoButton } from '@utils/text-constants';
import Standings from '@poka/components/info/Standings';
import Results from '@poka/components/info/Results';
import GameInfo from '@poka/components/info/GameInfo';
import ChatBox from '@components/chat/ChatBox';
import Buttons from '@poka/components/info/Buttons';
import toggle from '@icons/toggle.svg';
import './Info.scss';

const Info = ({ hideInfo, onToggleInfoPanel }) => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
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
        <img src={toggle} alt={'toggle'} />
      </div>
    </div>
  );
};

export default Info;
