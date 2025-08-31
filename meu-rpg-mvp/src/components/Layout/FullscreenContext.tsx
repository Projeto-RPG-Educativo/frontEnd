import React, { createContext, useContext, useRef, type ReactNode } from 'react';

// Define o tipo para o contexto
interface FullscreenContextType {
  toggleFullScreen: () => void;
  mainRef: React.RefObject<HTMLElement | null>;
}

// Cria o contexto com valores iniciais nulos
const FullscreenContext = createContext<FullscreenContextType | undefined>(undefined);

// Hook personalizado para usar o contexto
export const useFullscreen = () => {
  const context = useContext(FullscreenContext);
  if (!context) {
    throw new Error('useFullscreen deve ser usado dentro de um FullscreenProvider');
  }
  return context;
};

interface FullscreenProviderProps {
  children: ReactNode;
}

// Provedor do contexto
export const FullscreenProvider = ({ children }: FullscreenProviderProps) => {
  const mainRef = useRef<HTMLElement>(null);

  const toggleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      mainRef.current?.requestFullscreen();
    }
  };

  return (
    <FullscreenContext.Provider value={{ toggleFullScreen, mainRef }}>
      {children}
    </FullscreenContext.Provider>
  );
};