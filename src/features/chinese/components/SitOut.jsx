import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { exitSvg } from 'assets/svgs/various';
import ToolTip from '@ui/ToolTip';
import Overlay from '@ui/Overlay';
import Button from '@ui/Button';

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
        <Overlay style={{ zIndex: 200 }}>
          <motion.div
            className="sitback"
            initial={{ opacity: 0, top: 30 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}>
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
          </motion.div>
        </Overlay>
      )}
    </>
  );
};

export default SitOut;
