import { useSelector } from 'react-redux';

import { selectPlayername } from 'features/account/accountSlice';
import ToolTip from 'components/ui/ToolTip';
import Card from 'components/card/Card';

const DeniedCards = ({ playerState }) => {
  const hostPlayerName = useSelector(selectPlayername);
  const isHostPlayer = playerState.playerName === hostPlayerName;

  if (!playerState.deniedCards.length) return null;

  return (
    <>
      <span id="denies">{playerState.deniedCards.length}</span>
      <ToolTip info="ΑΡΝΗΣΕΙΣ">
        <div className="denied-cards">
          {playerState.deniedCards.map((card, i) => {
            if (isHostPlayer) card = { ...card, faceUp: true };
            return <Card card={card} key={i} />;
          })}
        </div>
      </ToolTip>
    </>
  );
};

export default DeniedCards;
