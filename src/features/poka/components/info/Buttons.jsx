import { memo } from 'react';

import { INFO_BUTTONS } from '@utils/text-constants';
import Button from '@ui/Button';
import './Buttons.scss';

const Buttons = ({ setSelected, selected }) => {
  const buttons = Object.values(INFO_BUTTONS);

  return (
    <div className="btns">
      {buttons.map(item => (
        <Button
          key={item}
          prompt={item}
          className={'info-button ' + (selected === item ? 'selected' : '')}
          onClick={() => setSelected(item)}
        />
      ))}
    </div>
  );
};

export default memo(Buttons);
