import { useSelector, useDispatch } from 'react-redux';

import Button from 'componentsChinese/ui/Button';
import { orderBySuit, orderByValue } from 'features/gameState/gameStateSlice';

const FantasyButtons = () => {
  const isFantasy = useSelector(state => state.gameState.isFantasy);
  const hand = useSelector(state => state.gameState.hand);
  const dispatch = useDispatch();

  const sortByValue = () => {
    dispatch(orderByValue());
  };
  const sortBySuit = () => {
    dispatch(orderBySuit());
  };

  return (
    <>
      {isFantasy && !!hand.filter(Boolean).length && (
        <div>
          <Button className="sort" onClick={sortByValue} prompt="V" />
          <Button className="sort" onClick={sortBySuit} prompt="S" />
        </div>
      )}
    </>
  );
};

export default FantasyButtons;
