import Card from 'features/chinese/components/card/Card';
import Cell from 'features/chinese/components/card/Cell';

const RenderItem = ({ card, index, owner, place }) =>
  card ? (
    <Card card={card} owner={owner} />
  ) : (
    <Cell index={index} place={place} owner={owner} />
  );

export default RenderItem;
