import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { useGetGameStateQuery } from 'features/gameState/gameStateApi';
import { selectPlayername } from 'features/account/accountSlice';
import GameDescription from 'components/info/GameDescription';
import { useEmoji } from 'components/info/chat/EmojiProvider';
import { collapseVertical } from 'assets/svgs/various';
import { infoButtons } from 'utils/text-constants';
import Standings from 'components/info/Standings';
import Results from 'components/info/Results';
import GameInfo from 'components/info/GameInfo';
import ChatBox from 'components/info/chat/ChatBox';
import Buttons from 'components/info/Buttons';
import './Info.scss';

const Info = ({ hideInfo, toggleHideInfo }) => {
  const { gameId } = useParams();
  const { data } = useGetGameStateQuery(gameId);
  const hostPlayerName = useSelector(selectPlayername);
  const [selected, setSelected] = useState(infoButtons.GAME_INFO);
  const { setShowPicker } = useEmoji();

  useEffect(() => {
    if (data.dealer === hostPlayerName)
      setSelected(infoButtons.GAME_DESCRIPTION);
  }, [data.dealer, hostPlayerName]);

  const toggleHandler = () => {
    toggleHideInfo();
    setShowPicker(false);
  };

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
      <div className="toggle-btn" onClick={toggleHandler}>
        {collapseVertical}
      </div>
    </div>
  );
};

export default Info;
