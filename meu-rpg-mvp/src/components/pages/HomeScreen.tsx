import React from 'react';
import Layout from '../Layout/Layout';

const HomeScreen: React.FC = () => {
  return (
    <Layout>
      <div className="home-screen-content">
        <h2>Bem-vindo ao Jogo!</h2>
        <p>Clique no botão para começar a jogar.</p>
        <button>Começar Jogo</button>
        
      </div>
    </Layout>
  );
};

export default HomeScreen;