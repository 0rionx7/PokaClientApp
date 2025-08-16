import {
  ACCOUNT_INSTRUCTIONS,
  SUBSCRIPTION_INSTRUCTIONS,
} from '@utils/text-constants';
import './Instructions.scss';

const Instructions = () => {
  const saloonParagraphs = SUBSCRIPTION_INSTRUCTIONS.split('@');
  const accountParagraphs = ACCOUNT_INSTRUCTIONS.split('@');

  return (
    <div className="instructions">
      <h2>ΛΕΙΤΟΥΡΓΕΙΕΣ ΜΕΝΟΥ</h2>
      <h3>ΣΑΛΟΥΝ</h3>
      {saloonParagraphs.map(paragraph => {
        const text = paragraph.split('_');
        return (
          <p key={text[0]}>
            <span>{text[0]}</span>
            {text[1]}
          </p>
        );
      })}
      <h3 style={{ marginTop: '.5rem' }}>ΛΟΓΑΡΙΑΣΜΟΣ</h3>
      {accountParagraphs.map(paragraph => {
        const text = paragraph.split('_');
        return (
          <p key={text[0]}>
            <span>{text[0]}</span>
            {text[1]}
          </p>
        );
      })}
    </div>
  );
};

export default Instructions;
