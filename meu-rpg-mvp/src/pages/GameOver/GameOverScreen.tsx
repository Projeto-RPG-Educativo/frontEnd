import React from 'react';
import './GameOverScreen.css';

interface GameOverScreenProps {
  message: string;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ message, onRestart }) => {
  return (
    <div className="game-over-container">
      <div className="game-over-wrapper">
        <h1 className="game-over-title">FIM DE JOGO</h1>
        <p className="game-over-message">{message}</p>
        <button onClick={onRestart} className="restart-button">
          Jogar Novamente
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;