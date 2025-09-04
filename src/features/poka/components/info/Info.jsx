import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useGetPokaStateQuery } from '@poka/api/pokaApi';
import { selectUserName } from '@account/api/accountApi';
import GameDescription from '@poka/components/info/GameDescription';
import { useEmoji } from '@components/chat/EmojiProvider';
import { INFO_BUTTONS_TITLES } from '@utils/text-constants';
import Standings from '@poka/components/info/Standings';
import Results from '@poka/components/info/Results';
import GameInfo from '@poka/components/info/GameInfo';
import ChatBox from '@components/chat/ChatBox';
import Buttons from '@poka/components/info/Buttons';
import toggle from '@icons/toggle.svg';
import './Info.scss';

const TABS = {
  [INFO_BUTTONS_TITLES.GAME_DESCRIPTION]: <GameDescription />,
  [INFO_BUTTONS_TITLES.GAME_INFO]: <GameInfo />,
  [INFO_BUTTONS_TITLES.CHAT]: <ChatBox />,
  [INFO_BUTTONS_TITLES.STANDINGS]: <Standings />,
  [INFO_BUTTONS_TITLES.LAST_GAME_RESULTS]: <Results />,
};

const Info = () => {
  const {
    data: { dealer },
  } = useGetPokaStateQuery();
  const hostPlayerName = useSelector(selectUserName);
  const [selectedTab, setSelectedTab] = useState(
    INFO_BUTTONS_TITLES.GAME_DESCRIPTION
  );
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const { setShowPicker } = useEmoji();

  useEffect(() => {
    if (dealer === hostPlayerName)
      setSelectedTab(INFO_BUTTONS_TITLES.GAME_DESCRIPTION);
  }, [setSelectedTab, dealer, hostPlayerName]);

  const handleToggleInfoPanel = () => {
    setShowInfoPanel((curr) => !curr);
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
