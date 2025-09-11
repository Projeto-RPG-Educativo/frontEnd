import React, { useContext } from 'react'; // 1. Importe o 'useContext'
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // 2. Importe o Contexto e o Provedor
import { useGameLogic } from './hooks/UseGameLogic';
import { FullscreenProvider } from './contexts/FullscreenContext';
import Layout from './components/Layout/Layout';
import LoginScreen from './pages/features/Auth/Login/LoginScreen';
import RegisterScreen from './pages/features/Auth/Login/RegisterScreen';
import MainMenu from './pages/features/MainMenu/MainMenu';
import SettingsScreen from './pages/features/Settings/SettingsScreen';
import ClassSelectionScreen from './pages/ClassSelection/ClassSelectionScreen';
import BattleScreen from './pages/Battle/BattleScreen';
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
import { classDefinitions } from './data/GameDataBank';

// O componente App agora foca apenas em renderizar as telas corretas
const App: React.FC = () => {
  // 3. Pegamos as informações de login DIRETAMENTE do contexto
  const { isLoggedIn, login, logout } = useContext(AuthContext); // (adicionamos logout para uso futuro)

  // 4. A lista de itens do useGameLogic fica muito mais limpa
  const {
    gameState,
    player,
    enemy,
    currentQuestion,
    dialogueData,
    currentDialogueIndex,
    handleSelectClass,
    handleAnswer,
    handleUseAbility,
    handleStartDialogue,
    handleAdvanceDialogue,
    goToClassSelection,
    handlePauseGame,
    handleResumeGame,
    isInventoryOpen, handleCloseInventory,
    isStatsOpen, handleCloseStats,
    isQuestsOpen, handleCloseQuests,
    isCodexOpen, handleCloseCodex,
    isHelpOpen, handleCloseHelp,
    isConfirmationOpen, handleOpenConfirmation, handleCloseConfirmation,
    handleAttack,
    handleFlee,
    handleUseItem,
    handleDefend,
  } = useGameLogic();


  // 5. A lógica principal agora se divide em duas partes:
  // O que mostrar se NÃO estiver logado vs. o que mostrar se ESTIVER logado.

  if (!isLoggedIn) {
    // Para simplificar, vamos criar o estado de registro aqui mesmo
    const [isRegistering, setIsRegistering] = React.useState(false);
    
    if (isRegistering) {
      // Após o registro, o usuário é enviado para a tela de login
      return <RegisterScreen onRegisterSuccess={() => setIsRegistering(false)} onGoToLogin={() => setIsRegistering(false)} />;
    } else {
      // A LoginScreen agora recebe a função 'login' do nosso contexto
      return <LoginScreen onLoginSuccess={login} onGoToRegister={() => setIsRegistering(true)} />;
    }
  }

  // Se o usuário ESTIVER LOGADO, renderizamos o jogo:
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
            onGoToMenu={() => { /* Navegar para o menu aqui */ }}
            player={player}
            enemy={enemy}
            handleAttack={handleAttack}
            handleDefend={handleDefend}
            handleUseItem={handleUseItem}
            handleFlee={handleFlee}
            currentQuestion={currentQuestion}
            modifiedOptions={null}
            gameMessage={null}
            onPauseGame={handlePauseGame} 
            onOpenQuiz={() => {}} 
            isQuizOpen={false} 
            classDefinitions={classDefinitions}
          />
        );
      // ... todos os outros cases de gameState (GAME_OVER, etc.)
      default:
        // Por padrão, se o usuário está logado, ele vai para o Menu Principal
        return <MainMenu onStartNewGame={goToClassSelection} onGoToSettings={() => {}} />;
    }
  };

  // Lógica dos Overlays (Pop-ups)
  const dialogueOverlay = (gameState === 'DIALOGUE' && dialogueData) ? (
    <DialogueScreen
      dialogueData={dialogueData ?? []}
      currentDialogueIndex={currentDialogueIndex}
      onAdvanceDialogue={handleAdvanceDialogue}
      characterImages={{ 'Herói': player?.image, 'Goblin': enemy?.image }}
    />
  ) : null;

  // ... adicione aqui a renderização de outros overlays que você tinha (Pause, Inventory, etc.)

  return (
    <>
      {renderGameContent()}
      {dialogueOverlay}
      {/* ... outros overlays ... */}
    </>
  );
};


// O AppWrapper é o componente principal que exportamos
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