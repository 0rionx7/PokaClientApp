import { accountInstructions, saloonInstructions } from 'lib/text-constants';
import './Instructions.scss';

const Instructions = () => {
  const saloonParagraphs = saloonInstructions.split('@');
  const accountParagraphs = accountInstructions.split('@');

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
