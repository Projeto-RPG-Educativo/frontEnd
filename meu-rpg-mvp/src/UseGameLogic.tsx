import { useState, useEffect } from 'react';
import {
  classDefinitions,
  type ClassName,
  type Player,
  type Enemy,
  type Question,
  questionsDb,
} from './GameDataBank';
import GoblinEstudado from './assets/GoblinEstudado.png'; 

// --- Interface para os dados do diálogo ---
interface DialogueLine {
  speaker: string;
  text: string;
}

export const useGameLogic = () => {
  // --- Estado da Aplicação (gerencia qual tela está visível) ---
  const [appState, setAppState] = useState<'LOGIN' | 'REGISTER' | 'MAIN_MENU' | 'SETTINGS' | 'LOADING' | 'GAME'>('LOGIN');

  // --- Estado do Jogo (gerencia o fluxo dentro da tela GAME) ---
  const [gameState, setGameState] = useState<'CLASS_SELECTION' | 'BATTLE' | 'DIALOGUE' | 'GAME_OVER' | 'PAUSE'>('CLASS_SELECTION');

  // --- Estado do Diálogo ---
  const [dialogueData, setDialogueData] = useState<DialogueLine[] | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  // --- Estados do Jogo ---
  const [player, setPlayer] = useState<Player | null>(null);
  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin da Gramática",
    hp: 100,
    maxHp: 100,
    damage: 20,
    image: GoblinEstudado, 
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questionsDb[0]);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // --- Funções de Navegação Global ---
  const handleGoToLogin = () => setAppState('LOGIN');
  const handleGoToRegister = () => setAppState('REGISTER');
  const handleLoginSuccess = () => setAppState('MAIN_MENU');
  const handleGoToMainMenu = () => setAppState('MAIN_MENU');
  const handleGoToSettings = () => setAppState('SETTINGS');

    const handleStartNewGame = () => {
    // Muda o estado para 'GAME' e 'CLASS_SELECTION'
    setAppState('GAME');
    setGameState('CLASS_SELECTION');
  };
    const handleGoToLoading = () => {
    setAppState('LOADING');
  };

  const handlePauseGame = () => {
    setGameState('PAUSE');
  };

  const handleResumeGame = () => {
    setGameState('BATTLE');
  };

  // --- Funções de Diálogo ---
  const handleStartDialogue = (dialogues: DialogueLine[], nextState: 'BATTLE' | 'GAME_OVER') => {
    setDialogueData(dialogues);
    setCurrentDialogueIndex(0);
    setGameState('DIALOGUE');
  };
  
  const handleAdvanceDialogue = () => {
    if (!dialogueData) return;

    if (currentDialogueIndex < dialogueData.length - 1) {
      setCurrentDialogueIndex(prevIndex => prevIndex + 1);
    } else {
      setDialogueData(null);
      setGameState('BATTLE'); // Retorna para a batalha quando o diálogo terminar
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        if (appState === 'GAME' && gameState === 'BATTLE') {
          handlePauseGame();
        } else if (appState === 'GAME' && gameState === 'PAUSE') {
          handleResumeGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [appState, gameState]); // Dependências do efeito

  // --- Efeito de Verificação de Fim de Jogo ---
  useEffect(() => {
    if (!player) return;

    if (enemy.hp <= 0) {
      setGameOverMessage("Você Venceu! O Goblin da Gramática foi derrotado!");
      setGameState('GAME_OVER');
    } else if (player.hp <= 0) {
      setGameOverMessage("Você foi derrotado! Tente novamente.");
      setGameState('GAME_OVER');
    }
  }, [player, enemy.hp]);

  // --- Funções de Lógica do Jogo ---
  const showGameMessage = (message: string) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(null), 3000);
  };

  const handleSelectClass = (className: ClassName) => {
    const selectedClass = classDefinitions[className];
    setPlayer({
      name: `Herói ${selectedClass.name}`,
      className: className,
      ...selectedClass.stats,
      abilityUsed: false,
      image: selectedClass.image, 
    });
    setGameState('BATTLE');
  };

   const handleAnswer = (selectedOption: string) => {
    if (!player || gameState !== 'BATTLE') return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const playerDamage = player.damage;
      const newEnemyHp = enemy.hp - playerDamage;
      setEnemy({ ...enemy, hp: newEnemyHp });
      
      const nextQuestionIndex = currentQuestionIndex + 1;
      handleStartDialogue([{ speaker: "Herói", text: "Resposta correta! Ponto para a minha sabedoria!" }], 'BATTLE');
      // Lógica de avanço da pergunta
      if (nextQuestionIndex < questionsDb.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setCurrentQuestion(questionsDb[nextQuestionIndex]);
      } else {
        // Se todas as perguntas acabaram, você venceu o jogo
        setGameOverMessage("Parabéns! Você derrotou o Goblin da Gramática!");
        setGameState('GAME_OVER');
      }
      
    } else {
      // Lógica de erro...
      const newPlayerHp = player.hp - enemy.damage;
      setPlayer({ ...player, hp: newPlayerHp });

      handleStartDialogue([{ speaker: "Goblin", text: "Você errou! Minha gramática é perfeita!" }], 'BATTLE');
      
      if (newPlayerHp <= 0) {
        setGameOverMessage("Você foi derrotado pela gramática do mal. Fim de jogo!");
        setGameState('GAME_OVER');
      }
    }
    setGameMessage(null);
  };
  
  const handleUseAbility = () => {
    if (!player || player.abilityUsed) return;
    setPlayer(p => ({ ...p!, abilityUsed: true }));
    // Lógica das habilidades...
    handleStartDialogue([{ speaker: "Herói", text: "Usando minha habilidade especial!" }], 'BATTLE');
  };

  const goToClassSelection = () => {
    setGameState('CLASS_SELECTION');
    // ... reset de estados ...
  };
  
  // --- Retorna todos os estados e funções necessários para o App.tsx ---
  return {
    appState,
    handleLoginSuccess,
    handleGoToLogin,
    handleGoToRegister,
    handleGoToMainMenu,
    handleGoToSettings,
    handleStartNewGame,
    setAppState,
    gameState,
    player,
    enemy,
    currentQuestion,
    gameOverMessage,
    modifiedOptions,
    gameMessage,
    handleSelectClass,
    handleUseAbility,
    handleAnswer,
    goToClassSelection,
    classDefinitions,
    
    dialogueData,
    currentDialogueIndex,
    currentDialogue: dialogueData ? dialogueData[currentDialogueIndex] : null,
    handleStartDialogue,
    handleAdvanceDialogue,
    isLoading,
    handleGoToLoading,
    handlePauseGame,
    handleResumeGame,
  };
};