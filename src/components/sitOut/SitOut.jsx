/*eslint no-unused-vars: "off"*/
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import exit from '@icons/exit.svg';
import Button from '@ui/Button';
import Overlay from '@ui/Overlay';
import ToolTip from '@ui/ToolTip';

const SitOut = () => {
  const [showDiag, setShowDiag] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  return (
    <>
      <div className="sitout" onClick={() => setShowDiag(true)}>
        {!showDiag && <ToolTip info="Έξοδος" />}
        <img src={exit} alt="exit" />
      </div>
      {showDiag && (
        <Overlay style={{ zIndex: 200 }}>
          <motion.div
            className="sitback"
            initial={{ opacity: 0, top: 30 }}
            animate={{ opacity: 1, top: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3>Τι επιθυμείτε;</h3>
            <div>
              <Button
                prompt="Επιστροφή "
                onClick={() => setShowDiag(false)}
                className="green"
              />
              <Button
                prompt="Έξοδος"
                onClick={() => navigate('/saloon', { state })}
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
