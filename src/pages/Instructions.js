import { instructions } from 'instructions';
import './Instructions.scss';

const Instructions = () => {
  const paragraphs = instructions.split('@');
  return (
    <div className="instructions">
      {paragraphs.map(paragraph => {
        const text = paragraph.split('_');
        return (
          <p>
            <span>{text[0]}</span>
            {text[1]}
          </p>
        );
      })}
    </div>
  );
};

export default Instructions;
