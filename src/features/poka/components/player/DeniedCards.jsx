import { useSelector } from 'react-redux';

import { selectUserName } from 'features/account/slice/accountSlice';
import ToolTip from 'components/ui/ToolTip';
import Card from 'components/card/Card';

const DeniedCards = ({ playerState }) => {
  const hostPlayerName = useSelector(selectUserName);
  const isHostPlayer = playerState.playerName === hostPlayerName;

  if (!playerState.deniedCards.length) return null;

  return (
    <>
      <span id="denies">{playerState.deniedCards.length}</span>
      <ToolTip info="ΑΡΝΗΣΕΙΣ">
        <div className="denied-cards">
          {playerState.deniedCards.map(card => {
            if (isHostPlayer) card = { ...card, faceUp: true };
            return <Card card={card} key={card} />;
          })}
        </div>
      </ToolTip>
    </>
  );
};

export default DeniedCards;
