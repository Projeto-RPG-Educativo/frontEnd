import React from 'react';
import { motion } from 'framer-motion';
import './HelpScreen.css';

interface HelpScreenProps {
  onClose: () => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="help-screen"
    >
      <div className="help-header">
        <h1>Ajuda</h1>
        <button className="help-close-button" onClick={onClose}>X</button>
      </div>
      <div className="help-content">
        <h2>Controles do Jogo</h2>
        <ul>
          <li>P: Pausar/Continuar Jogo</li>
          <li>I: Abrir/Fechar Inventário</li>
          <li>O: Abrir/Fechar Status do Personagem</li>
          <li>Q: Abrir/Fechar Missões</li>
          <li>C: Abrir/Fechar Códex</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default HelpScreen;
