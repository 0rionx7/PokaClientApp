import { useSelector } from 'react-redux';

import { selectUserName } from '@account/api/accountApi';
import ToolTip from '@ui/ToolTip';
import Card from '@poka/components/card/Card';

const DeniedCards = ({ playerState }) => {
  const hostPlayerName = useSelector(selectUserName);
  const isHostPlayer = playerState.playerName === hostPlayerName;

  if (!playerState.deniedCards.length) return null;

  return (
    <>
      <span id="denials">{playerState.deniedCards.length}</span>
      <ToolTip info="ΑΡΝΗΣΕΙΣ">
        <div className="denied-cards">
          {playerState.deniedCards.map(card => {
            if (isHostPlayer) card = { ...card, faceUp: true };
            return <Card card={card} key={card.value + card.suit} />;
          })}
        </div>
      </ToolTip>
    </>
  );
};

export default DeniedCards;
