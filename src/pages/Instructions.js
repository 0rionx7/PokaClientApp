import { instructions } from 'lib/text-constants';
import './Instructions.scss';

const Instructions = () => {
  const paragraphs = instructions.split('@');

  return (
    <div className="instructions">
      {paragraphs.map(paragraph => {
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
