import Card from 'componentsChinese/card/Card';
import Cell from 'componentsChinese/card/Cell';

const RenderItem = ({ card, index, owner, place }) =>
  card ? (
    <Card card={card} owner={owner} />
  ) : (
    <Cell index={index} place={place} owner={owner} />
  );

export default RenderItem;
