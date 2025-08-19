import React from 'react';
import Layout from '../Layout/Layout';
interface GameOverScreenProps {
  message: string;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ message, onRestart }) => {
  return (
    <Layout>
    <div className="game-over-box">
      <h2>{message}</h2>
      <button onClick={onRestart}>Jogar Novamente</button>
    </div>
    </Layout>
  );
};

export default GameOverScreen;