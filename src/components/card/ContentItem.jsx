import aceOfSpades from '@icons/aceOfSpades.svg';
import { suits } from 'assets/svgs/suits';
import './Card.scss';

const ContentItem = ({ card, i }) => {
  const id = `s-${i}`;

  if (card.value + card.suit === '14S')
    return (
      <div id={id} style={{ gridArea: id }} key={id}>
        <div className="ace-of-spades">
          <img src={aceOfSpades} alt={'aceOfSpades'} />
          <div className="card-logo">{import.meta.env.VITE_DOMAIN_NAME}</div>
        </div>
      </div>
    );

  return (
    <div id={id} style={{ gridArea: id }} key={id}>
      {suits[card.suit]}
    </div>
  );
};

export default ContentItem;
