import React, { useContext, useState } from 'react'; // Adicione useState aqui
import { useGameLogic } from './hooks/UseGameLogic';
import { FullscreenProvider } from './contexts/FullscreenContext';
import Layout from './components/Layout/Layout';
import ClassSelectionScreen from './pages/ClassSelectionScreen/ClassSelectionScreen';
import BattleScreen from './pages/BattleScreen/BattleScreen';
import GameOverScreen from './pages/GameOverScreen/GameOverScreen';
import MainMenu from './pages/MainMenu/MainMenu';
import './index.css';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
import SettingsScreen from './pages/SettingsScreen/SettingsScreen';
import MapScreen from './pages/MapScreen/MapScreen';
import { AuthContext, AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  const { isLoggedIn, login } = useContext(AuthContext);

  // MUDANÇA 1: Trazemos a lógica de troca de tela para dentro do App
  const [isRegistering, setIsRegistering] = useState(false);
  const handleGoToRegister = () => setIsRegistering(true);
  const handleGoToLogin = () => setIsRegistering(false);

  // MUDANÇA 2: Removemos as variáveis que não existem mais do useGameLogic
  const {
    gameState,
    player,
    handleGoToMap,
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
    showSettings,
    goToSettings,
    handleGoToMainMenu,
  } = useGameLogic();

  if (!isLoggedIn) {
    if (isRegistering) {
      // Agora usamos as funções que acabamos de criar aqui no App
      return <RegisterScreen onRegisterSuccess={handleGoToLogin} onGoToLogin={handleGoToLogin} />;
    } else {
      return <LoginScreen onLoginSuccess={login} onGoToRegister={handleGoToRegister} />;
    }
  }

  const renderGameScreen = () => {
    if (showSettings) {
      return <SettingsScreen onGoToMainMenu={handleGoToMainMenu} onSaveGame={() => {}} onLoadGame={() => {}} />;
    }

    switch (gameState) {
      case 'MAIN_MENU':
        return <MainMenu onStartNewGame={handleGoToMap} onGoToSettings={goToSettings} />;
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
      case 'MAP_VIEW':
        return <MapScreen />;
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

const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};

export default AppWrapper;