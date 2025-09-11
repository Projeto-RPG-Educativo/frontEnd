import React, { useState, useEffect } from 'react';
import Player from '../Player/Player';
import "./GameMap.css";

const TILE_SIZE = 40; // Tamanho de cada "passo" do personagem

const GameMap: React.FC = () => {
  // 'useState' para guardar a posição atual do jogador (x, y)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // 'useEffect' é onde a mágica de "ouvir" as teclas acontece.
  useEffect(() => {
    // Função que será chamada toda vez que uma tecla for pressionada
    const handleKeyDown = (e: KeyboardEvent) => {
      // Usamos um switch para verificar qual tecla foi pressionada
      switch (e.key.toLowerCase()) {
        case 'w': // Cima
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y - TILE_SIZE }));
          break;
        case 'a': // Esquerda
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x - TILE_SIZE }));
          break;
        case 's': // Baixo
          setPosition((prevPos) => ({ ...prevPos, y: prevPos.y + TILE_SIZE }));
          break;
        case 'd': // Direita
          setPosition((prevPos) => ({ ...prevPos, x: prevPos.x + TILE_SIZE }));
          break;
        default:
          break;
      }
    };

    // Adicionamos o "ouvinte" de eventos ao carregar o componente
    window.addEventListener('keydown', handleKeyDown);

    // Função de limpeza: removemos o "ouvinte" ao desmontar o componente
    // Isso é MUITO importante para evitar vazamentos de memória.
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // O array vazio [] significa que este efeito só roda uma vez (ao montar)

  return (
    <div className="game-map">
      <Player position={position} />
      {/* Outros elementos do mapa poderiam vir aqui, como NPCs, monstros, etc. */}
    </div>
  );
};

export default GameMap;