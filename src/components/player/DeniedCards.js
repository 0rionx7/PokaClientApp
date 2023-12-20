import { useSelector } from 'react-redux';

import ToolTip from 'components/ui/ToolTip';
import Card from 'components/card/Card';

const DeniedCards = ({ playerState }) => {
  const hostPlayerName = useSelector(state => state.account.username);
  const isHostPlayer = playerState.playerName === hostPlayerName;

  if (!playerState.deniedCards.length) return null;

  return (
    <>
      <span id="denies">{playerState.deniedCards.length}</span>
      <ToolTip info="ΑΡΝΗΣΕΙΣ">
        <div style={{ display: 'flex' }}>
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
