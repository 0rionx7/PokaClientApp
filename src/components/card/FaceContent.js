import { jack, king, queen } from 'assets/svgs/figures';
import { suits } from 'assets/svgs/suits';
import './Card.scss';

const FaceContent = ({ card }) => {
  const figure = card.value === 11 ? jack : card.value === 12 ? queen : king;

  return (
    <>
      <div className="silhouette-suit">{suits[card.suit]}</div>
      <div className="silhouette-suit"> {suits[card.suit]}</div>
      {figure}
    </>
  );
};

export default FaceContent;
