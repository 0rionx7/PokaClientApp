import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ToolTip from 'componentsChinese/ui/ToolTip';
import Overlay from 'componentsChinese/ui/Overlay';
import Button from 'componentsChinese/ui/Button';
import { exitSvg } from 'assets/svgs/various';

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
                onClick={() => navigate('/chinese/saloon')}
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
