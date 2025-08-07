import { useSelector, useDispatch } from 'react-redux';

import Button from 'ui/Button';
import {
  orderBySuit,
  orderByValue,
  selectHandcards,
  selectIsFantasy,
} from 'chinese/slice/chineseStateSlice';
import classes from './Table.module.scss';

const FantasyButtons = () => {
  const isFantasy = useSelector(selectIsFantasy);
  const handCards = useSelector(selectHandcards);
  const dispatch = useDispatch();

  const sortByValue = () => {
    dispatch(orderByValue());
  };
  const sortBySuit = () => {
    dispatch(orderBySuit());
  };

  return (
    <>
      {isFantasy && !!handCards.filter(Boolean).length && (
        <div>
          <Button className={classes.sort} onClick={sortByValue} prompt="V" />
          <Button className={classes.sort} onClick={sortBySuit} prompt="S" />
        </div>
      )}
    </>
  );
};

export default FantasyButtons;
