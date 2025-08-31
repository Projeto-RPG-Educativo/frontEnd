import React from 'react';

interface GameOverScreenProps {
  message: string;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ message, onRestart }) => {
  return (
    <div className="game-over-box">
      <h2>{message}</h2>
      <button onClick={onRestart}>Jogar Novamente</button>
    </div>

  );
};

export default GameOverScreen;