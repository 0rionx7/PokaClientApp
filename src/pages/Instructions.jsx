import {
  ACCOUNT_INSTRUCTIONS,
  SUBSCRIPTION_INSTRUCTIONS,
} from '@utils/text-constants';
import './Instructions.scss';

const Instructions = () => {
  return (
    <div className="instructions">
      <h2>ΛΕΙΤΟΥΡΓΕΙΕΣ ΜΕΝΟΥ</h2>
      <h3>ΣΑΛΟΥΝ</h3>
      {Object.entries(SUBSCRIPTION_INSTRUCTIONS).map(([title, info]) => (
        <p key={title}>
          <span>{title}: </span>
          {info}
        </p>
      ))}
      <h3 style={{ marginTop: '.5rem' }}>ΛΟΓΑΡΙΑΣΜΟΣ</h3>
      {Object.entries(ACCOUNT_INSTRUCTIONS).map(([title, info]) => (
        <p key={title}>
          <span>{title}: </span>
          {info}
        </p>
      ))}
    </div>
  );
};

export default Instructions;
