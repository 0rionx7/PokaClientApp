import { aceOfSpades } from 'assets/svgs/figures';
import { suits } from 'assets/svgs/suits';
import './Card.scss';

const ContentItem = ({ card, i }) => {
  return (
    <div id={'s-' + i} style={{ gridArea: 's-' + i }} key={i}>
      {card.value + card.suit !== '14S' ? (
        suits[card.suit]
      ) : (
        <div className="ace-of-spades">
          {aceOfSpades}
          <div className="e-poka-logo">e-poka.gr</div>
        </div>
      )}
    </div>
  );
};

export default ContentItem;
