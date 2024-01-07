import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setHideInfo } from 'features/account/accountSlice';

const Config = () => {
  const hideInfo = useSelector(state => state.account.hideInfo);
  const dispatch = useDispatch();

  useEffect(() => () => {
    try {
      window.localStorage.setItem('hideInfo', hideInfo);
    } catch (error) {
      console.log(error);
    }
  });

  const checkHandler = () => {
    dispatch(setHideInfo(!hideInfo));
  };

  return (
    <>
      <label>εμφάνιση αναδυόμενων πληροφοριών</label>
      <input
        type="checkbox"
        className="checkbox"
        style={{ height: '1rem', marginLeft: '.5rem' }}
        value={hideInfo}
        checked={!hideInfo}
        onChange={checkHandler}
      />
    </>
  );
};

export default memo(Config);
