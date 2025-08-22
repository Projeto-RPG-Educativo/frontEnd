import React from 'react';
import './Layout.css';
import ButtonsMain from '../Buttons/ButtonsMain'; 
import ButtonsHeader from '../Buttons/ButtonsHeader';
import { useFullscreen } from './FullscreenContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Pega a referência 'mainRef' do contexto
  const { mainRef } = useFullscreen(); 
  
  return (
    <div className="layout-container">
      <header className="layout-header">
        <ButtonsHeader/>
      </header>

      <div className="layout-content-wrapper">  
        <aside className="layout-sidebar">
          <ButtonsMain/>
        </aside>
        
        {/* Adiciona a referência 'ref={mainRef}' aqui */}
        <main className="layout-main" ref={mainRef}>
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