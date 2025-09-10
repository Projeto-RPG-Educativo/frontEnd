import { useState, useEffect } from 'react';
import {
  classDefinitions,
  type ClassName,
  type Player,
  type Enemy,
  type Question,
  QuestionsDb,
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
    mana: 100,
    maxMana: 100,
    image: GoblinEstudado, 
  });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(QuestionsDb[0]);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); 
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isDefending, setIsDefending] = useState(false);


  // --- Funções de Navegação Global ---
  const handleGoToLogin = () => setAppState('LOGIN');
  const handleGoToRegister = () => setAppState('REGISTER');
  const handleLoginSuccess = () => setAppState('MAIN_MENU');
  const handleGoToMainMenu = () => setAppState('MAIN_MENU');
  const handleGoToSettings = () => setAppState('SETTINGS');

   const handleOpenInventory = () => {
    setIsInventoryOpen(true);
  };

  const handleCloseInventory = () => {
    setIsInventoryOpen(false);
  };

   const handleOpenStats = () => {
    setIsStatsOpen(true);
  };

  const handleCloseStats = () => {
    setIsStatsOpen(false);
  };
 // --- Funções de Missões ---
  const handleOpenQuests = () => {
    setIsQuestsOpen(true);
  };

  const handleCloseQuests = () => {
    setIsQuestsOpen(false);
  };

   // --- Funções de Codex ---
  const handleOpenCodex = () => {
    setIsCodexOpen(true);
  };

  const handleCloseCodex = () => {
    setIsCodexOpen(false);
  };

  // --- Funções de Help ---
  const handleOpenHelp = () => {
    setIsHelpOpen(true);
  };

  const handleCloseHelp = () => {
    setIsHelpOpen(false);
  };

  // --- Funções de Confirmação ---
  const handleOpenConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  // --- Funções de Quiz ---
  const handleQuizOpen = () => {
    setIsQuizOpen(true);
  }

  const handleQuizClose = () => {
    setIsQuizOpen(false);
  }

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
      if (appState === 'GAME' && gameState === 'BATTLE') {
        if (event.key === 'p' || event.key === 'P') {
          handlePauseGame();
        }
        if (event.key === 'i' || event.key === 'I') {
          handleOpenInventory();
        }
        if (event.key === 'o' || event.key === 'O') {
          handleOpenStats();
        }
        if (event.key === 'q' || event.key === 'Q') {
          handleOpenQuests();
        }
        if (event.key === 'c' || event.key === 'C') {
          handleOpenCodex();
        }
        if (event.key === 'h' || event.key === 'H') {
          handleOpenHelp();
        }
       } else if (isInventoryOpen && (event.key === 'i' || event.key === 'I')) {
          handleCloseInventory();
      } else if (isStatsOpen && (event.key === 'o' || event.key === 'O')) {
          handleCloseStats();
      } else if (isQuestsOpen && (event.key === 'q' || event.key === 'Q')) {
          handleCloseQuests();
      } else if (isCodexOpen && (event.key === 'c' || event.key === 'C')) {
          handleCloseCodex();
      } else if (gameState === 'PAUSE' && isConfirmationOpen && (event.key === 'p' || event.key === 'P')) {
          // Fechar o modal de confirmação e voltar para o menu de pausa
          handleCloseConfirmation();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [appState, gameState, isInventoryOpen, isStatsOpen, isQuestsOpen, isCodexOpen, isConfirmationOpen]);

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


   const handleAttack = () => {
    if (!player) return;
    const damage = player.damage;
    const newEnemyHp = enemy.hp - damage;
    setEnemy({ ...enemy, hp: newEnemyHp });
    showGameMessage(`Você atacou o ${enemy.name} e causou ${damage} de dano!`);
    // Lógica para o turno do inimigo vir em seguida...
  };

  const handleDefend = () => {
    setIsDefending(true);
    showGameMessage("Você está em posição de defesa.");
    // Lógica para o turno do inimigo vir em seguida...
  };

  const handleUseItem = () => {
    if (!player) return;
    // Por enquanto, vamos apenas simular a cura
    const healAmount = 30;
    const newHp = Math.min(player.maxHp, player.hp + healAmount);
    setPlayer({ ...player, hp: newHp });
    showGameMessage(`Você usou um item e curou ${healAmount} de HP.`);
    // Lógica para o turno do inimigo vir em seguida...
  };

  const handleFlee = () => {
    // Chance de 50% de fugir
    if (Math.random() > 0.5) {
      handleStartDialogue([{ speaker: "Herói", text: "Você conseguiu fugir com sucesso!" }], 'GAME_OVER');
      handleGoToMainMenu();
    } else {
      showGameMessage("Sua fuga falhou!");
      // Lógica para o turno do inimigo vir em seguida...
    }
  };

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
      mana: 10,
      maxMana: 100, 
    });
    setGameState('BATTLE');
  };

    const handleAnswer = (selectedOption: string) => {
    if (!player || gameState !== 'BATTLE') return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      const playerDamage = player.damage;
      const newEnemyHp = enemy.hp - playerDamage;
      const manaGained = 20; // Mana ganha por resposta correta
      const newPlayerMana = Math.min(player.maxMana, player.mana + manaGained);
      
      setEnemy({ ...enemy, hp: newEnemyHp });
      setPlayer({ ...player, mana: newPlayerMana });

      const nextQuestionIndex = currentQuestionIndex + 1;
      handleStartDialogue([{ speaker: "Herói", text: "Resposta correta! Minha energia se renova!" }], 'BATTLE');
      
      if (nextQuestionIndex < QuestionsDb.length) {
        setCurrentQuestionIndex(nextQuestionIndex);
        setCurrentQuestion(QuestionsDb[nextQuestionIndex]);
      } else {
        setGameOverMessage("Parabéns! Você derrotou o Goblin da Gramática!");
        setGameState('GAME_OVER');
      }
      
    } else {
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
    if (!player || player.abilityUsed || player.mana < 50) return; // Habilidade custa 50 de mana
    setPlayer(p => ({ ...p!, abilityUsed: true, mana: p!.mana - 50 }));
    // A habilidade pode causar um dano maior aqui
    const abilityDamage = player.damage * 2;
    const newEnemyHp = enemy.hp - abilityDamage;
    setEnemy({ ...enemy, hp: newEnemyHp });
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
    handleOpenInventory,
    handleCloseInventory,
    isInventoryOpen,
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
    isQuizOpen,
    onOpenQuiz: handleQuizOpen,
    onCloseQuiz: handleQuizClose,
    handleAttack, // Nova função de ataque
    handleDefend, // Nova função de defesa
    handleUseItem, // Nova função de usar item
    handleFlee, // Nova função de fugir
    isDefending, 


  };
};