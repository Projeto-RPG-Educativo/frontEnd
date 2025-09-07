import React from 'react';
import { motion } from 'framer-motion';
import './PauseScreen.css';

interface PauseMenuProps {
  onResume: () => void;
  onGoToMainMenu: () => void;
  onGoToSettings: () => void; // Adicionado a prop
}

const PauseScreen = ({ onResume, onGoToMainMenu, onGoToSettings }: PauseMenuProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pause-menu-overlay"
    >
      <div className="pause-menu-box">
        <h1>Jogo Pausado</h1>
        <button onClick={onResume}>Continuar Jogo</button>
        <button onClick={onGoToSettings}>Configurações</button> {/* Novo botão */}
        <button onClick={onGoToMainMenu}>Voltar ao Menu Principal</button>
      </div>
    </motion.div>
  );
};

export default PauseScreen;
