import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { exitSvg } from 'assets/svgs/various';
import ToolTip from 'components/ui/ToolTip';
import Overlay from 'components/ui/Overlay';
import Button from 'components/ui/Button';

const SitOut = () => {
  const [showDiag, setShowDiag] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="sitout" onClick={() => setShowDiag(true)}>
        {!showDiag && <ToolTip info="Έξοδος" />}
        {exitSvg}
      </div>
      {showDiag && (
        <Overlay>
          <div className="sitback">
            <h3>Τι επιθυμείτε;</h3>
            <div>
              <Button
                prompt="Επιστροφή "
                onClick={() => setShowDiag(false)}
                className="green"
              />
              <Button
                prompt="Έξοδος"
                onClick={() => navigate('/saloon-chinese')}
                className="red"
              />
            </div>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default SitOut;
