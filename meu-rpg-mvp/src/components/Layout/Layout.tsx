import React from 'react';
import './Layout.css';
import ButtonsMain from '../Buttons/ButtonsMain'; 
import ButtonsHeader from '../Buttons/ButtonsHeader';
import { useFullscreen } from '../../contexts/FullscreenContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Pega a referência 'mainRef' do contexto
  const { mainRef } = useFullscreen(); 
  
  return (
    <div className="layout-container">
      
      <div className="layout-content-wrapper"> 
        
       {/* 
        <header className="layout-header">
        <ButtonsHeader/>
      </header>
       
       <aside className="layout-sidebar">
          <ButtonsMain/>
        </aside>
        
         <footer className="layout-footer">
        <p>© 2025 Joguinho dos Cria . Todos os direitos reservados.</p>
      </footer>
       */
      }
        
        
        {/* Adiciona a referência 'ref={mainRef}' aqui */}
        <main className="layout-main" ref={mainRef}>
          {children}
        </main>
      </div>

     
    </div>
  );
};