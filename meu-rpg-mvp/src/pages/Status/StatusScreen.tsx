import React from 'react';
import { motion } from 'framer-motion';
import './StatusScreen.css';
import { type Player } from '../../GameDataBank';

interface StatusScreenProps {
  player: Player | null;
  onClose: () => void;
}

const StatusScreen: React.FC<StatusScreenProps> = ({ player, onClose }) => {
  if (!player) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="stats-screen"
    >
      <div className="stats-header">
        <h1>Status do Personagem</h1>
        <button className="stats-close-button" onClick={onClose}>X</button>
      </div>
      <div className="stats-content">
        <div className="player-info">
          <img src={player.image} alt={player.name} className="player-image" />
          <div className="player-details">
            <h2>{player.name}</h2>
            <p>Classe: {player.className}</p>
          </div>
        </div>
        <div className="stats-list">
          <p>HP: {player.hp}/{player.maxHp}</p>
          <p>Ataque: {player.damage}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default StatusScreen;
