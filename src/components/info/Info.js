import { useState } from 'react';

import GameDescription from 'src/components/info/GameDescription';
import { collapseVertical } from 'src/assets/svgs/various';
import { infoButtons } from 'src/common/text-constants';
import Standings from 'src/components/info/Standings';
import Results from 'src/components/action/Results';
import GameInfo from 'src/components/info/GameInfo';
import ChatBox from 'src/components/info/chat/ChatBox';
import Buttons from 'src/components/info/Buttons';
import './Info.scss';

const Info = ({ hideInfo, toggleHideInfo }) => {
  const [selected, setSelected] = useState(infoButtons.GAME_DESCRIPTION);

  return (
    <div className="info">
      <div className={'info-content ' + (hideInfo ? 'hidden' : '')}>
        <Buttons setSelected={setSelected} selected={selected} />
        {selected === infoButtons.GAME_DESCRIPTION && <GameDescription />}
        {selected === infoButtons.GAME_INFO && <GameInfo />}
        {selected === infoButtons.CHAT && <ChatBox />}
        {selected === infoButtons.STANDINGS && <Standings />}
        {selected === infoButtons.LAST_GAME_RESULTS && <Results />}
      </div>
      <div className="toggle-btn" onClick={toggleHideInfo}>
        {collapseVertical}
      </div>
    </div>
  );
};

export default Info;
