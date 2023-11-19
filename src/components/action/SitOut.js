import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'src/components/ui/Button';
import { exitSvg } from 'src/assets/svgs/various';
import Overlay from 'src/components/ui/Overlay';

const SitOut = () => {
  const [showDiag, setShowDiag] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="sitout" onClick={() => setShowDiag(true)}>
        <div className="tool-tip" style={{ display: showDiag && 'none' }}>
          Έξοδος
        </div>
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
              />{' '}
              <Button
                prompt="Έξοδος"
                onClick={() => navigate('/saloon')}
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
