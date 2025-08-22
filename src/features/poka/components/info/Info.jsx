import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/slice/accountSlice';
import GameDescription from '@poka/components/info/GameDescription';
import { useEmoji } from '@components/chat/EmojiProvider';
import { INFO_BUTTONS } from '@utils/text-constants';
import Standings from '@poka/components/info/Standings';
import Results from '@poka/components/info/Results';
import GameInfo from '@poka/components/info/GameInfo';
import ChatBox from '@components/chat/ChatBox';
import Buttons from '@poka/components/info/Buttons';
import toggle from '@icons/toggle.svg';
import './Info.scss';

const TABS = {
  [INFO_BUTTONS.GAME_DESCRIPTION]: <GameDescription />,
  [INFO_BUTTONS.GAME_INFO]: <GameInfo />,
  [INFO_BUTTONS.CHAT]: <ChatBox />,
  [INFO_BUTTONS.STANDINGS]: <Standings />,
  [INFO_BUTTONS.LAST_GAME_RESULTS]: <Results />,
};

const Info = () => {
  const { gameId } = useParams();
  const { data } = useGetPokaStateQuery(gameId);
  const hostPlayerName = useSelector(selectUserName);
  const [selectedTab, setSelectedTab] = useState(INFO_BUTTONS.GAME_DESCRIPTION);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const { setShowPicker } = useEmoji();

  useEffect(() => {
    if (data.dealer === hostPlayerName)
      setSelectedTab(INFO_BUTTONS.GAME_DESCRIPTION);
  }, [setSelectedTab, data.dealer, hostPlayerName]);

  const handleToggleInfoPanel = () => {
    setShowInfoPanel(curr => !curr);
    setShowPicker(false);
  };

  return (
    <div className="info">
      {showInfoPanel && (
        <div className="info-content">
          <Buttons setSelected={setSelectedTab} selected={selectedTab} />
          {TABS[selectedTab]}
        </div>
      )}
      <div className="toggle-btn" onClick={handleToggleInfoPanel}>
        <img src={toggle} alt={'toggle'} />
      </div>
    </div>
  );
};

export default Info;
