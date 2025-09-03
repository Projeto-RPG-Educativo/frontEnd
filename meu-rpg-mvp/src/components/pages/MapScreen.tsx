import React from 'react';
import GameMap from '../GameMap'; // Ajuste o caminho se necessário

const MapScreen: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem'
    }}>
      <h2>Mapa do Mundo</h2>
      <p>Use W, A, S, D para se mover.</p>
      <GameMap />
    </div>
  );
};

export default MapScreen;