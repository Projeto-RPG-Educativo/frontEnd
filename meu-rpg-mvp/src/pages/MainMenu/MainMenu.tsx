import React, { useContext } from 'react'; // Importe React e useContext juntos
import './MainMenu.css';
import { useFullscreen } from '../../contexts/FullscreenContext';
import { AuthContext } from '../../contexts/AuthContext';

interface MainMenuProps {
  onStartNewGame: () => void;
  onGoToSettings: () => void;
}

export default function MainMenu({ onStartNewGame,  onGoToSettings }: MainMenuProps) {
  // Hooks são chamados AQUI, dentro do corpo do componente
  const { toggleFullScreen } = useFullscreen();
  const { logout } = useContext(AuthContext); // <-- A linha foi movida para cá

  const handleStartGame = () => {
    // A função toggleFullScreen não existe mais, mas se você quiser, pode adicioná-la aqui
    // toggleFullScreen();
    onStartNewGame();
  };

  return (
    <div className="main-menu-container">
      <div className="game-title-wrapper">
        <h1 className="game-title">RPG Educativo</h1> {/* Ajustei o título */}
      </div>
      <div className="main-menu-buttons">
        <button className="menu-button" onClick={handleStartGame}>NOVO JOGO</button>
        <button className="menu-button" onClick={onGoToSettings}>CONFIGURAÇÕES</button>
        <button className="menu-button" onClick={logout}>SAIR DO JOGO</button>
      </div>
    </div>
  );
}