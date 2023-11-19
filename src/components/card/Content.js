import ContentItem from 'src/components/card/ContentItem';
import FaceContent from 'src/components/card/FaceContent';
import './Content.scss';

const Content = ({ card }) => {
  if (card.value > 10 && card.value !== 14) return <FaceContent card={card} />;

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
