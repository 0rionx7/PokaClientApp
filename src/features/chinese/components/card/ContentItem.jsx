import aceOfSpades from '@icons/aceOfSpades.svg';
import { suits } from 'assets/svgs/suits';
import './Card.scss';

const ContentItem = ({ card, i }) => {
  return (
    <div id={'s-' + i} style={{ gridArea: 's-' + i }} key={i}>
      {card.value + card.suit !== '14S' ? (
        suits[card.suit]
      ) : (
        <div className="ace-of-spades">
          <img src={aceOfSpades} alt={'aceOfSpades'} />;
          <div className="card-logo">{import.meta.env.VITE_DOMAIN_NAME}</div>
        </div>
      )}
    </div>
  );
};

export default ContentItem;
