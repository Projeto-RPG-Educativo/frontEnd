import React from 'react';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header className="layout-header">
        <h1>colocar botoes aqui</h1>
        {/* Aqui você pode adicionar um menu, status do jogador, etc. */}
      </header>

      <div className="layout-content-wrapper">
        <aside className="layout-sidebar">
         
        </aside>
        
        <main className="layout-main">
          {children}
        </main>
      </div>

      <footer className="layout-footer">
        <p>© 2025 Joguinho dos Cria . Todos os direitos reservados.</p>
        {/* Outras informações como versão do jogo, créditos, etc. */}
      </footer>
    </div>
  );
};

export default Layout;