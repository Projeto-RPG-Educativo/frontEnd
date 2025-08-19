import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>Seu Jogo Incrível!</h1>
        {/* Aqui você pode adicionar um menu, status do jogador, etc. */}
      </header>

      <div className="layout-content-wrapper">
        <aside className="layout-sidebar">
          {/* Conteúdo da barra lateral. Aqui pode ser onde o HUD dos personagens e inimigos está. */}
        </aside>
        <main className="layout-main">
          {children}
        </main>
      </div>

      <footer className="layout-footer">
        <p>© 2025 Seu Nome. Todos os direitos reservados.</p>
        {/* Outras informações como versão do jogo, créditos, etc. */}
      </footer>
    </div>
  );
};

export default Layout;