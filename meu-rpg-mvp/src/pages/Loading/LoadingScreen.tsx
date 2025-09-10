import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './LoadingScreen.css';
import li1 from '../../assets/LoadingImage/li1.jpg';

// Lista de imagens para o fundo (coloque aqui os caminhos para suas imagens)
const backgroundImages = [
  li1
];

// Lista de dicas para o jogo
const tips = [
  'Dica: Fique atento aos diálogos para descobrir mais sobre a história.',
  'Dica: Use suas habilidades especiais para causar mais dano.',
  'Dica: Respostas corretas não só derrotam o inimigo, como fortalecem o seu herói!',
  'Dica: Gerencie sua vida com cuidado! Uma resposta errada pode ser fatal.',
  'Dica: Cada classe tem suas próprias vantagens. Escolha com sabedoria!',
];

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState('');
  const [currentBgImage, setCurrentBgImage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Lógica para o progresso aleatório
  useEffect(() => {
    // Define a duração total do carregamento em milissegundos (40 segundos)
    const totalDuration = 10000;
    // Define o intervalo de atualização em milissegundos
    const updateInterval = 100;
    // Calcula o progresso total que precisa ser adicionado a cada intervalo
    const totalUpdates = totalDuration / updateInterval;
    let updatesDone = 0;

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        // Se o progresso já estiver em 100, para o intervalo
        if (prevProgress >= 100) {
          clearInterval(interval);
          setIsLoaded(true); // O carregamento foi concluído
          return 100;
        }

        updatesDone++;
        // Calcula o progresso restante e o número de atualizações restantes
        const progressLeft = 100 - prevProgress;
        const updatesLeft = totalUpdates - updatesDone;

        // Garante que o progresso não ultrapasse 100
        if (updatesLeft <= 0) {
          return 100;
        }
        
        // Gera um valor aleatório para a próxima atualização
        const randomIncrement = Math.random() * (progressLeft / updatesLeft) * 2;
        
        return Math.min(100, prevProgress + randomIncrement);
      });
    }, updateInterval);

    // Limpa o intervalo quando o componente é desmontado para evitar vazamento de memória
    return () => clearInterval(interval);
  }, []);

  // Lógica para trocar a imagem de fundo
  useEffect(() => {
    setCurrentBgImage(backgroundImages[0]);
    let imageIndex = 0;
    const imageInterval = setInterval(() => {
      imageIndex = (imageIndex + 1) % backgroundImages.length;
      setCurrentBgImage(backgroundImages[imageIndex]);
    }, 5000); // Muda a cada 5 segundos
    
    return () => clearInterval(imageInterval);
  }, []);

  // Lógica para trocar as dicas
  useEffect(() => {
    setCurrentTip(tips[0]);
    let tipIndex = 0;
    const tipInterval = setInterval(() => {
      tipIndex = (tipIndex + 1) % tips.length;
      setCurrentTip(tips[tipIndex]);
    }, 4000); // Muda a cada 4 segundos
    
    return () => clearInterval(tipInterval);
  }, []);
  
  // Lógica para detectar o clique de qualquer tecla e avançar
  useEffect(() => {
    if (isLoaded) {
      const handleKeyPress = () => {
        onLoadingComplete();
      };

      window.addEventListener('keydown', handleKeyPress);
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }
  }, [isLoaded, onLoadingComplete]);

  return (
    <div className="loading-container" style={{ backgroundImage: `url(${currentBgImage})` }}>
      <div className="overlay">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="tips-box"
        >
          {currentTip}
        </motion.div>
      </div>
      
      {isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="continue-message"
        >
          CLIQUE QUALQUER TECLA PARA CONTINUAR
        </motion.div>
      )}

      <div className="progress-bar-area">
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="progress-text">{Math.round(progress)}%</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
