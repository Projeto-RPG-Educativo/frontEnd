import './ButtonsMain.css';
import { useFullscreen } from '../../contexts/FullscreenContext';


export default function ButtonsMain() {
  const { toggleFullScreen } = useFullscreen();

  return (
    <div className="game-controls">
      
        <button className="metal-slug-button" onClick={toggleFullScreen} >Iniciar Jogo</button>
        <button className="metal-slug-button">Pausar</button>
        <button className="metal-slug-button">Reiniciar</button>
        <button className="metal-slug-button">Salvar Jogo</button>
        <button className="metal-slug-button">Carregar Jogo</button>
        <button className="metal-slug-button">Configurações</button>
        <button className="metal-slug-button">ajuda</button>
        <button className="metal-slug-button">Sair</button>

    </div>
  );
};