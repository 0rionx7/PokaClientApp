import { useParams } from 'react-router-dom';

import { useAssignJokerMutation } from 'features/gameState/gameStateApi';
import Button from 'components/ui/Button';
import Card from 'components/card/Card';

const JokerSubmit = ({ jokers, resetJokers }) => {
  const [assignJoker, { isLoading, isSuccess }] = useAssignJokerMutation();
  const { gameId } = useParams();

  return (
    <div className="card-container">
      <div className="replace">
        ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΜΠΑΛΑΝΤΕΡ ΜΕ:
        <div className="jokers">
          {jokers.map((card, i) => (
            <Card card={card} key={i} />
          ))}
        </div>
      </div>
      <Button className="red" prompt="ΑΚΥΡΩΣΗ" onClick={resetJokers} />
      <Button
        className="green"
        prompt="ΥΠΟΒΟΛΗ"
        onClick={() => assignJoker({ gameId, jokers })}
        disabled={isLoading || isSuccess}
      />
    </div>
  );
};

export default JokerSubmit;
