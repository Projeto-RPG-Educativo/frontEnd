import React from 'react';
import { motion } from 'framer-motion'; // Importa o motion
import './MainMenu.css';
import { useFullscreen } from '../../components/Layout/FullscreenContext';

interface MainMenuProps {
  onStartNewGame: () => void;
  onGoToSettings: () => void;
}

// 🎯 Definição das variantes para as animações
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Inicia a animação dos filhos depois que o container começa
      staggerChildren: 0.2, // Atraso entre a animação de cada filho
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 10,
      delay: 0.5, // Um pequeno atraso para o título aparecer depois do container
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, x: -50 }, // Começa à esquerda
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function MainMenu({ onStartNewGame, onGoToSettings }: MainMenuProps) {
  const { toggleFullScreen } = useFullscreen();

  const handleStartGame = () => {
    toggleFullScreen();
    onStartNewGame();
  };

  return (
    <motion.div // 👈 Anima o container principal do menu
      className="main-menu-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div // 👈 Anima o wrapper do título
        className="game-title-wrapper"
        variants={containerVariants} // Usamos o containerVariants para herdar o staggerChildren
      >
        <motion.h1 // 👈 Anima o título do jogo
          className="game-title"
          variants={titleVariants}
        >
          DESCONHECIDO
        </motion.h1>
      </motion.div>

      <motion.div // 👈 Anima o container dos botões para o staggerChildren
        className="main-menu-buttons"
        variants={containerVariants} // Permite que os botões dentro dele usem o staggerChildren
      >
        <motion.button
          className="menu-button"
          onClick={handleStartGame}
          variants={buttonVariants}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }} // Efeito de hover mais gamer
          whileTap={{ scale: 0.9 }}
        >
          NOVO JOGO
        </motion.button>
        <motion.button
          className="menu-button"
          onClick={onGoToSettings}
          variants={buttonVariants}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
        >
          CONFIGURAÇÕES
        </motion.button>
        <motion.button
          className="menu-button"
          variants={buttonVariants}
          whileHover={{ scale: 1.1, textShadow: "0px 0px 8px rgb(255,255,255)" }}
          whileTap={{ scale: 0.9 }}
          // Você pode adicionar um onClick para sair do jogo aqui, se houver lógica para isso.
          // Por exemplo, um window.close() se for um navegador, ou uma função no Electron/Tauri.
        >
          SAIR DO JOGO
        </motion.button>
      </motion.div>
    </motion.div>
  );
}