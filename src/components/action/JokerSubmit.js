import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAssignJokerMutation } from 'features/gameState/gameStateApi';
import { resetJoker } from 'features/gameState/gameStateSlice';
import Button from 'components/ui/Button';
import Card from 'components/card/Card';

const JokerSubmit = () => {
  const jokers = useSelector(state => state.gameState.jokers);
  const [assignJoker, { isLoading, isSuccess }] = useAssignJokerMutation();
  const dispatch = useDispatch();
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
      <Button
        className="red"
        prompt="ΑΚΥΡΩΣΗ"
        onClick={() => dispatch(resetJoker())}
      />
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
