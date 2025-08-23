import React from 'react';
import { useGameLogic } from './UseGameLogic';
import { FullscreenProvider } from './components/Layout/FullscreenContext';
import Layout from './components/Layout/Layout';
import ClassSelectionScreen from './components/pages/ClassSelectionScreen';
import BattleScreen from './components/pages/BattleScreen';
import GameOverScreen from './components/pages/GameOverScreen';
import MainMenu from './components/pages/MainMenu';
import './index.css';

// Componente principal que gerencia o estado e as telas do jogo.
const App: React.FC = () => {
  // Chama o hook para obter toda a lógica
  const {
    gameState,
    player,
    enemy,
    currentQuestion,
    gameOverMessage,
    modifiedOptions,
    gameMessage,
    handleSelectClass,
    handleAnswer,
    handleUseAbility,
    goToClassSelection,
    classDefinitions,
    goToClassSelectionFromMenu,
  } = useGameLogic();

  // Renderização condicional baseada no estado do jogo
  const renderGameScreen = () => {
    switch (gameState) {
        case 'MAIN_MENU':
        return <MainMenu onStartNewGame={goToClassSelectionFromMenu} />
      case 'CLASS_SELECTION':
        return <ClassSelectionScreen onSelectClass={handleSelectClass} />;
      case 'BATTLE':
        if (!player) return null;
        return (
          <BattleScreen
            player={player}
            enemy={enemy}
            currentQuestion={currentQuestion}
            modifiedOptions={modifiedOptions}
            gameMessage={gameMessage}
            onAnswer={handleAnswer}
            onUseAbility={handleUseAbility}
            classDefinitions={classDefinitions}
            onGoToMenu={goToClassSelection}
          />
        );
      case 'GAME_OVER':
        return <GameOverScreen message={gameOverMessage} onRestart={goToClassSelection} />;
      default:
        return null;
    }
  };

  return (
    <FullscreenProvider>
      <Layout>
        {renderGameScreen()}
      </Layout>
    </FullscreenProvider>
  );
};

export default App;