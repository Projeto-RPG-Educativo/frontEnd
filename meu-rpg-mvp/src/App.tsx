import React from 'react';

import { useGameLogic } from './UseGameLogic';
import { FullscreenProvider } from './components/Layout/FullscreenContext';
import Layout from './components/Layout/Layout';
import LoginScreen from './features/Auth/Login/LoginScreen';
import RegisterScreen from './features/Auth/Login/RegisterScreen';
import MainMenu from './features/MainMenu/MainMenu';
import SettingsScreen from './features/Settings/SettingsScreen';
import ClassSelectionScreen from './pages/ClassSelection/ClassSelectionScreen';
import BattleScreen from './pages/Battle/Rpg/BattleScreen';
import DialogueScreen from './pages/Dialogue/DialogueScreen';
import { classDefinitions, QuestionsDb } from './GameDataBank';
import GameOverScreen from './pages/GameOver/GameOverScreen';
import LoadingScreen from './pages/Loading/LoadingScreen';
import PauseScreen from './pages/Pause/PauseScreen';
import InventoryScreen from './pages/Inventory/InventoryScreen';
import StatusScreen from './pages/Status/StatusScreen';
import QuestScreen from './pages/Quests/QuestScreen';
import CodexScreen from './pages/Codex/CodexScreen';
import HelpScreen from './pages/Help/HelpScreen';
import ConfirmationScreen from './pages/Confirmation/ConfirmationScreen';

const App: React.FC = () => {
  const {
    appState,
    setAppState,
    handleLoginSuccess,
    handleGoToLogin,
    handleGoToRegister,
    handleGoToMainMenu,
    handleGoToSettings,
    handleStartNewGame,
    handleCloseInventory,
    isInventoryOpen,
    gameState,
    player, // Importe o player
    enemy, // Importe o inimigo
    currentQuestion, // Importe a pergunta
    dialogueData,
    currentDialogueIndex,
    handleSelectClass,
    handleAnswer,
    handleUseAbility,
    handleStartDialogue,
    handleAdvanceDialogue,
    goToClassSelection,
    handleGoToLoading,
    handlePauseGame,
    handleResumeGame,
    isStatsOpen,
    handleCloseStats,
    isQuestsOpen,
    handleCloseQuests,
    isCodexOpen,
    handleCloseCodex,
    isHelpOpen,
    handleCloseHelp,
    isConfirmationOpen,
    handleOpenConfirmation,
    handleCloseConfirmation,
    handleAttack,
    handleFlee,
    handleUseItem,
    handleDefend,




  } = useGameLogic();
  const handleLoadingComplete = () => {
    handleStartNewGame();
  };

  const renderAppScreen = () => {
    switch (appState) {
      case 'LOGIN':
        return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />;
      case 'REGISTER':
        return <RegisterScreen onRegisterSuccess={handleGoToLogin} onGoToLogin={handleGoToLogin} />;
      case 'MAIN_MENU':
        return <MainMenu onStartNewGame={() => handleGoToLoading()} onGoToSettings={handleGoToSettings} />;
      case 'SETTINGS':
        return <SettingsScreen onGoToMainMenu={handleGoToMainMenu} onSaveGame={() => { }} onLoadGame={() => { }} />;
      case 'LOADING':
        return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
      case 'GAME':
        const gameContent = renderGameContent();
        const dialogueOverlay = (gameState === 'DIALOGUE' && dialogueData) ? (
          <DialogueScreen
            dialogueData={dialogueData ?? []}
            currentDialogueIndex={currentDialogueIndex}
            onAdvanceDialogue={handleAdvanceDialogue}
            characterImages={{
              'Herói': player?.image,
              'Goblin': enemy?.image
            }} // Adicione as imagens aqui
          />
        ) : null;
        const gameOverOverlay = gameState === 'GAME_OVER' ? (
          <GameOverScreen message="Você perdeu! parabens seu saco de coco." onRestart={goToClassSelection} />
        ) : null;

        const pauseOverlay = gameState === 'PAUSE' ? (
          <PauseScreen
            onResume={handleResumeGame}
            onGoToMainMenu={handleOpenConfirmation} // Abre a confirmação ao tentar voltar ao menu
            onGoToSettings={() => setAppState('SETTINGS')} // Adiciona a navegação para Settings
          />
        ) : null;

        const inventoryOverlay = isInventoryOpen ? (
          <InventoryScreen onGoToMainMenu={handleCloseInventory} />
        ) : null;

        const statusOverlay = isStatsOpen ? (
          <StatusScreen player={player} onClose={handleCloseStats} />
        ) : null;

        const questsOverlay = isQuestsOpen ? (
          <QuestScreen onClose={handleCloseQuests} />
        ) : null;
        const codexOverlay = isCodexOpen ? (
          <CodexScreen onClose={handleCloseCodex} />
        ) : null;
        const helpOverlay = isHelpOpen ? (
          <HelpScreen onClose={handleCloseHelp} />
        ) : null;
        const confirmationOverlay = isConfirmationOpen ? (
          <ConfirmationScreen
            message="Tem certeza que deseja voltar ao menu principal? O progresso não salvo será perdido."
            onConfirm={handleGoToMainMenu}
            onCancel={handleCloseConfirmation}
          />
        ) : null;

        return (
          <>
            {gameContent}
            {dialogueOverlay}
            {gameOverOverlay}
            {pauseOverlay} {/* Renderiza o overlay de pausa */}
            {inventoryOverlay} {/* Renderiza o overlay do inventário */}
            {statusOverlay} {/* Renderiza o overlay de status */}
            {questsOverlay} {/* Renderiza o overlay de missões */}
            {codexOverlay} {/* Renderiza o overlay do códex */}
            {helpOverlay} {/* Renderiza o overlay de ajuda */}
            {confirmationOverlay} {/* Renderiza o overlay de confirmação */}
          </>
        );
      default:
        return null;
    }
  };

  const renderGameContent = () => {
    switch (gameState) {
      case 'CLASS_SELECTION':
        return <ClassSelectionScreen onSelectClass={handleSelectClass} />;
      case 'BATTLE':
        if (!player || !enemy || !currentQuestion) {
          return <div>Carregando...</div>;
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
            modifiedOptions={null}
            gameMessage={null}
            onPauseGame={handlePauseGame} onOpenQuiz={function (): void {
              throw new Error('Function not implemented.');
            }} isQuizOpen={false} />
        );
      case 'GAME_OVER':
        return (<div className="game-over-screen">
          <h1>Game Over</h1>
          <button onClick={handleGoToMainMenu}>Voltar ao Menu Principal</button>
        </div>
        );
      default:
        return null;
    }
  };

  return (
    <FullscreenProvider>
      <Layout>
        {renderAppScreen()}
      </Layout>
    </FullscreenProvider>
  );
};

export default App;