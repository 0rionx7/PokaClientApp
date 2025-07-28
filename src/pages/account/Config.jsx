import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectDeckColor,
  selectHideInfo,
  setDeckColor,
  setHideInfo,
} from 'features/account/accountSlice';
import classes from './Account.module.scss';

const deckColors = [
  'rgb(255 0 0 / 80%)',
  'rgb(168 0 234 / 81%)',
  'rgb(0 116 234 / 81%)',
  'rgb(255 143 0 / 92%)',
];

const Config = () => {
  const hideInfo = useSelector(selectHideInfo);
  const deckColor = useSelector(selectDeckColor);
  const dispatch = useDispatch();

  const toggleHideInfo = () => {
    dispatch(setHideInfo(!hideInfo));
    try {
      window.localStorage.setItem('hideInfo', !hideInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const changeColorHandler = e => {
    dispatch(setDeckColor(e.target.value));
    try {
      window.localStorage.setItem('deckColor', e.target.value);
    } catch (error) {
      console.log(error);
    }
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
          onChange={toggleHideInfo}
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
            onChange={changeColorHandler}
            key={i}
            checked={deckColor === label}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Config);
