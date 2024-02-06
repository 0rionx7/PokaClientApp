import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDeckColor, setHideInfo } from 'features/account/accountSlice';
import classes from './Account.module.scss';

const deckColors = [
  'rgb(255 0 0 / 80%)',
  'rgb(168 0 234 / 81%)',
  'rgb(0 116 234 / 81%)',
  'rgb(255 143 0 / 92%)',
];

const Config = () => {
  const hideInfo = useSelector(state => state.account.hideInfo);
  const deckColor = useSelector(state => state.account.deckColor);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      window.localStorage.setItem('hideInfo', hideInfo);
    } catch (error) {
      console.log(error);
    }
  }, [hideInfo]);

  useEffect(() => {
    try {
      window.localStorage.setItem('deckColor', deckColor);
    } catch (error) {
      console.log(error);
    }
  }, [deckColor]);

  const checkHandler = () => {
    dispatch(setHideInfo(!hideInfo));
  };
  const colorHandler = e => {
    dispatch(setDeckColor(e.target.value));
  };

  return (
    <div className={classes.config}>
      <div className={classes.hideInfo}>
        <label>Εμφάνιση αναδυόμενων πληροφοριών</label>
        <input
          type="checkbox"
          className="checkbox"
          style={{ height: '1rem', marginLeft: '.5rem' }}
          value={hideInfo}
          checked={!hideInfo}
          onChange={checkHandler}
        />
      </div>
      <div className={classes['deck-color']}>
        <div>Χρώμα τράπουλας</div>
        {deckColors.map((label, i) => (
          <input
            type="radio"
            className="checkbox"
            name="deckColor"
            value={label}
            onChange={colorHandler}
            key={i}
            checked={deckColor === label}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Config);
