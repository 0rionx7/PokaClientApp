import ContentItem from 'chinese/components/card/ContentItem';
import Figure from 'chinese/components/card/Figure';
import './Content.scss';

const Content = ({ card }) => {
  if (card.value > 10 && card.value !== 14) return <Figure card={card} />;

  const contentItems = Array(card.value === 14 ? 1 : card.value).fill('');

  return (
    <>
      {contentItems.map((_, i) => (
        <ContentItem card={card} i={i} key={i} />
      ))}
    </>
  );
};

export default Content;
