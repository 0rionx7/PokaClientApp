import { memo } from 'react';

import { infoButtons } from 'src/common/text-constants';
import Button from 'src/components/ui/Button';
import './Buttons.scss';

const Buttons = ({ setSelected, selected }) => {
  const buttons = Object.values(infoButtons);

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
