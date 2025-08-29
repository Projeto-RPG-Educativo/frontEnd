import '../Styles/MainMenu.css';
import { useFullscreen } from '../Layout/FullscreenContext';

interface MainMenuProps {
  onStartNewGame: () => void;
  onGoToSettings: () => void;
}

export default function MainMenu({ onStartNewGame,  onGoToSettings }: MainMenuProps) {
  const { toggleFullScreen } = useFullscreen();

  const handleStartGame = () => {
    toggleFullScreen();
    onStartNewGame();
  };

  return (
    <div className="main-menu-container">
      <div className="game-title-wrapper">
        <h1 className="game-title">SEXO E PUTARIA</h1>
      </div>
      <div className="main-menu-buttons">
      
        <button className="menu-button" onClick={handleStartGame}>NOVO JOGO</button>
        <button className="menu-button" onClick={onGoToSettings}>CONFIGURAÇÕES</button>
        <button className="menu-button">SAIR DO JOGO</button>
      </div>
    </div>
  );
}