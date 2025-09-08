import React from 'react';
import { motion } from 'framer-motion';
import './ConfirmationScreen.css';

interface ConfirmationScreenProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({ message, onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="confirmation-modal-overlay"
    >
      <div className="confirmation-modal-box">
        <p>{message}</p>
        <div className="confirmation-actions">
          <button onClick={onConfirm}>Sim</button>
          <button onClick={onCancel}>Não</button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConfirmationScreen;
