import { suits } from 'assets/svgs/suits';
import jack from '@icons/jack.svg';
import king from '@icons/king.svg';
import queen from '@icons/queen.svg';
import './Card.scss';

const icons = { king, queen, jack };

const Figure = ({ card }) => {
  const figure =
    card.value === 11 ? 'jack' : card.value === 12 ? 'queen' : 'king';

  return (
    <>
      <div className="silhouette-suit">{suits[card.suit]}</div>
      <div className="silhouette-suit"> {suits[card.suit]}</div>
      <img src={icons[figure]} alt={figure} />
    </>
  );
};

export default Figure;
