import React, { useContext, useState } from 'react';
import { AuthProvider, AuthContext } from './contexts/AuthContext';
import { useGameLogic } from './hooks/UseGameLogic';
import { FullscreenProvider } from './contexts/FullscreenContext';
import Layout from './components/Layout/Layout';
import AuthScreen from './pages/AuthScreen/AuthScreen';
import LoginScreen from './pages/LoginScreen/LoginScreen';
import RegisterScreen from './pages/RegisterScreen/RegisterScreen';
import MainMenu from './pages/MainMenu/MainMenu';
import SettingsScreen from './pages/SettingsScreen/SettingsScreen';
import ClassSelectionScreen from './pages/ClassSelection/ClassSelectionScreen';
import BattleScreen from './pages/BattleScreen/BattleScreen';
import DialogueScreen from './pages/Dialogue/DialogueScreen';
import GameOverScreen from './pages/GameOver/GameOverScreen';
import LoadingScreen from './pages/Loading/LoadingScreen';
import PauseScreen from './pages/Pause/PauseScreen';
import InventoryScreen from './pages/Inventory/InventoryScreen';
import StatusScreen from './pages/Status/StatusScreen';
import QuestScreen from './pages/Quests/QuestScreen';
import CodexScreen from './pages/Codex/CodexScreen';
import HelpScreen from './pages/Help/HelpScreen';
import ConfirmationScreen from './pages/Confirmation/ConfirmationScreen';
import MapScreen from './pages/MapScreen/MapScreen';
import { classDefinitions } from './data/GameDataBank';

// Componente App focado apenas em renderizar as telas corretas
const App: React.FC = () => {
  const { isLoggedIn, login, logout } = useContext(AuthContext);

  const {
    gameState, player, enemy, currentQuestion, dialogueData, currentDialogueIndex,
    gameMessage, modifiedOptions, gameOverMessage,
    handleSelectClass, handleAnswer, handleUseAbility, handleStartDialogue,
    handleAdvanceDialogue, goToClassSelection, handlePauseGame, handleResumeGame,
    isInventoryOpen, handleCloseInventory, isStatsOpen, handleCloseStats,
    isQuestsOpen, handleCloseQuests, isCodexOpen, handleCloseCodex,
    isHelpOpen, handleCloseHelp, isConfirmationOpen, handleOpenConfirmation,
    handleCloseConfirmation, handleAttack, handleFlee, handleUseItem, handleDefend,
    handleGoToMap, onOpenQuiz, isQuizOpen,
    handleGoToMainMenu, handleStartNewGame
  } = useGameLogic();

  console.log('--- App Renderizou ---'); 
  console.log('isLoggedIn:', isLoggedIn); 
  console.log('gameState:', gameState); 

  // Lógica de renderização principal: ou mostra Login/Registro, ou mostra o Jogo.
  if (!isLoggedIn) {
  return <AuthScreen />;
  }

  // --- Renderização do Jogo para um usuário LOGADO ---
  
  const renderGameContent = () => {
    switch (gameState) {
      case 'CLASS_SELECTION':
        return <ClassSelectionScreen onSelectClass={handleSelectClass} />;
      case 'BATTLE':
        if (!player || !enemy || !currentQuestion) {
          return <LoadingScreen onLoadingComplete={() => {}} />;
        }
        return (
          <BattleScreen
            onStartDialogue={handleStartDialogue}
            onAnswer={handleAnswer}
            onUseAbility={handleUseAbility}
            onGoToMenu={handleGoToMainMenu}
            player={player}
            enemy={enemy}
            handleAttack={handleAttack}
            handleDefend={handleDefend}
            handleUseItem={handleUseItem}
            handleFlee={handleFlee}
            currentQuestion={currentQuestion}
            onPauseGame={handlePauseGame}
            onOpenQuiz={onOpenQuiz}
            isQuizOpen={isQuizOpen}
            classDefinitions={classDefinitions}
            gameMessage={gameMessage}
            modifiedOptions={modifiedOptions}
          />
        );
      case 'GAME_OVER':
        return <GameOverScreen message={gameOverMessage} onRestart={goToClassSelection} />;
      case 'MAP_VIEW':
        return <MapScreen />;
      case 'MAIN_MENU':
      default:
        return <MainMenu onStartNewGame={handleStartNewGame} onGoToSettings={() => { /* Implementar goToSettings no hook */ }} onLogout={logout} />;
    }
  };

  // ***** A CORREÇÃO ESTÁ AQUI *****
  // Reintroduzimos a definição das constantes de overlay que estavam faltando.
  const dialogueOverlay = (gameState === 'DIALOGUE' && dialogueData && player && enemy) ? (
    <DialogueScreen
      dialogueData={dialogueData}
      currentDialogueIndex={currentDialogueIndex}
      onAdvanceDialogue={handleAdvanceDialogue}
      characterImages={{ 'Herói': player.image, 'Goblin': enemy.image }}
    />
  ) : null;
  
  const pauseOverlay = gameState === 'PAUSE' ? ( <PauseScreen onResume={handleResumeGame} onGoToMainMenu={handleOpenConfirmation} onGoToSettings={() => {}} /> ) : null;
  const inventoryOverlay = isInventoryOpen ? <InventoryScreen onGoToMainMenu={handleCloseInventory} /> : null;
  const statusOverlay = isStatsOpen ? <StatusScreen player={player} onClose={handleCloseStats} /> : null;
  const questsOverlay = isQuestsOpen ? <QuestScreen onClose={handleCloseQuests} /> : null;
  const codexOverlay = isCodexOpen ? <CodexScreen onClose={handleCloseCodex} /> : null;
  const helpOverlay = isHelpOpen ? <HelpScreen onClose={handleCloseHelp} /> : null;
  const confirmationOverlay = isConfirmationOpen ? (
    <ConfirmationScreen
      message="Tem certeza que deseja voltar ao menu principal? O progresso não salvo será perdido."
      onConfirm={handleGoToMainMenu}
      onCancel={handleCloseConfirmation}
    />
  ) : null;

  return (
    <>
      {renderGameContent()}
      {dialogueOverlay}
      {pauseOverlay}
      {inventoryOverlay}
      {statusOverlay}
      {questsOverlay}
      {codexOverlay}
      {helpOverlay}
      {confirmationOverlay}
    </>
  );
};

// O AppWrapper é o componente principal que exportamos, ele provê todos os contextos e o layout
const AppWrapper: React.FC = () => {
  return (
    <AuthProvider>
      <FullscreenProvider>
        <Layout>
          <App />
        </Layout>
      </FullscreenProvider>
    </AuthProvider>
  );
};

export default AppWrapper;