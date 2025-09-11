import React from 'react';
import GameMap from '../../components/GameMap/GameMap'; // 1. Garanta que a importação do mapa está correta

const Home: React.FC = () => {
  // No futuro, você pode adicionar aqui a lógica para mostrar o menu,
  // o status do jogador, o botão de logout, etc., ao redor do mapa.

  return (
    <div className="home-container" style={{
      display: 'flex',
      flexDirection: 'column', // Para alinhar itens verticalmente se precisar
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#282c34' // Um fundo escuro para o mapa se destacar
    }}>
      <h1>Bem-vindo ao Jogo!</h1>
      <p>Use W, A, S, D para se mover.</p>
      
      {/* 2. Renderize o componente GameMap aqui */}
      <GameMap />

    </div>
  );
};

export default Home;