import React from 'react';
import './Player.css'; // Criaremos este CSS a seguir

interface PlayerProps {
  position: { x: number; y: number };
}

const Player: React.FC<PlayerProps> = ({ position }) => {
  // Usamos estilos inline para atualizar a posição do jogador na tela dinamicamente
  const playerStyle = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return <div className="player" style={playerStyle}></div>;
};

export default Player;