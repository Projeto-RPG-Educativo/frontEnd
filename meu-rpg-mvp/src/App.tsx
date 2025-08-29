import React from 'react';
import { useGameLogic } from './UseGameLogic';
import { FullscreenProvider } from './components/Layout/FullscreenContext';
import Layout from './components/Layout/Layout';
import ClassSelectionScreen from './components/pages/ClassSelectionScreen';
import BattleScreen from './components/pages/BattleScreen';
import GameOverScreen from './components/pages/GameOverScreen';
import MainMenu from './components/pages/MainMenu';
import './index.css';
import LoginScreen from './components/pages/LoginScreen';
import RegisterScreen from './components/pages/RegisterScreen';
import SettingsScreen from './components/pages/SettingsScreen';

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
    isLoggedIn,
    handleLoginSuccess,
    isRegistering,
    handleGoToRegister,
    handleGoToLogin,
    showSettings,
    goToSettings,
    handleGoToMainMenu,
    handleStartNewGame,
  } = useGameLogic();

  // Se o usuário não estiver logado, mostra a tela de login
   if (!isLoggedIn) {
    if (isRegistering) {
      return <RegisterScreen onRegisterSuccess={handleLoginSuccess} onGoToLogin={handleGoToLogin} />;
    } else {
      return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />;
    }
  } 

    
  // Renderização condicional baseada no estado do jogo
  const renderGameScreen = () => {
    if (showSettings) {
      // Se showSettings for true, renderize a tela de configurações
      return <SettingsScreen onGoToMainMenu={handleGoToMainMenu} onSaveGame={() => {}} onLoadGame={() => {}} />;
    }

    switch (gameState) {
        case 'MAIN_MENU':
          return <MainMenu onStartNewGame={handleStartNewGame} onGoToSettings={goToSettings} />;
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