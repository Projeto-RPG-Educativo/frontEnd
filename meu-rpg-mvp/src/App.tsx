import React from 'react';
import { useGameLogic } from './UseGameLogic';
import { FullscreenProvider } from './components/Layout/FullscreenContext';
import Layout from './components/Layout/Layout';
import LoginScreen from './features/Auth/Login/LoginScreen';
import RegisterScreen from './features/Auth/Login/RegisterScreen';
import MainMenu from './features/MainMenu/MainMenu';
import SettingsScreen from './features/Settings/SettingsScreen';
import ClassSelectionScreen from './pages/ClassSelection/ClassSelectionScreen';
import BattleScreen from './pages/Battle/BattleScreen';
import DialogueScreen from './pages/Dialogue/DialogueScreen';
// --- Adicione a importação do GameDataBank para usar os dados globais ---
import { classDefinitions, questionsDb } from './GameDataBank';
import GoblinEstudado from './assets/GoblinEstudado.png'; // Importe a imagem do inimigo
import GameOverScreen from './pages/GameOver/GameOverScreen';

const App: React.FC = () => {
    const {
        appState,
        handleLoginSuccess,
        handleGoToLogin,
        handleGoToRegister,
        handleGoToMainMenu,
        handleGoToSettings,
        handleStartNewGame,

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
    } = useGameLogic();

    const renderAppScreen = () => {
        switch (appState) {
            case 'LOGIN':
                return <LoginScreen onLoginSuccess={handleLoginSuccess} onGoToRegister={handleGoToRegister} />;
            case 'REGISTER':
                return <RegisterScreen onRegisterSuccess={handleGoToLogin} onGoToLogin={handleGoToLogin} />;
            case 'MAIN_MENU':
                return <MainMenu onStartNewGame={handleStartNewGame} onGoToSettings={handleGoToSettings} />;
            case 'SETTINGS':
                return <SettingsScreen onGoToMainMenu={handleGoToMainMenu} onSaveGame={() => {}} onLoadGame={() => {}} />;
            case 'GAME':
                const gameContent = renderGameContent();
                const dialogueOverlay = (gameState === 'DIALOGUE' && dialogueData) ? (
                    <DialogueScreen
                        dialogueData={dialogueData ?? []}
                        currentDialogueIndex={currentDialogueIndex}
                        onAdvanceDialogue={handleAdvanceDialogue}
                        characterImages={{
                             'Herói': player?.image, 
                             'Goblin': enemy?.image }} // Adicione as imagens aqui
                    />
                ) : null;
                const gameOverOverlay = gameState === 'GAME_OVER' ? (
                  <GameOverScreen message="Você perdeu! parabens seu saco de coco." onRestart={goToClassSelection} />
                ) : null;
                
                return (
                    <>
                        {gameContent}
                        {dialogueOverlay}
                        {gameOverOverlay}
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
                        currentQuestion={currentQuestion}
                        modifiedOptions={null}
                        gameMessage={null}
                        classDefinitions={classDefinitions}
                    />
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