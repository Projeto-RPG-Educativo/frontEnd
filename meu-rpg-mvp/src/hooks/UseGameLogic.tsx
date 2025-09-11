import { useState, useEffect } from 'react';
import api from '../services/api'; // Usando nossa API centralizada
import {
  classDefinitions,
  type ClassName,
  type Player,
  type Enemy,
  type Question,
} from '../data/GameDataBank'; // Mantemos os dados estáticos de CLASSE por enquanto
import GoblinEstudado from '../assets/GoblinEstudado.png';

// --- Interface para os dados do diálogo ---
interface DialogueLine {
  speaker: string;
  text: string;
}

// O hook agora é focado 100% na lógica DENTRO do jogo.
export const useGameLogic = () => {
  // --- Estados do Jogo ---
  const [gameState, setGameState] = useState<'MAIN_MENU' | 'MAP_VIEW' | 'CLASS_SELECTION' | 'BATTLE' | 'DIALOGUE' | 'GAME_OVER' | 'PAUSE'>('MAIN_MENU');
  const [player, setPlayer] = useState<Player | null>(null);
  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin da Gramática",
    hp: 100, maxHp: 100, damage: 20, mana: 100, maxMana: 100, image: GoblinEstudado,
  });
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDefending, setIsDefending] = useState(false);

  // --- Estados de UI (Modais e Menus) ---
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isQuestsOpen, setIsQuestsOpen] = useState(false);
  const [isCodexOpen, setIsCodexOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  
  // --- Estados do Diálogo ---
  const [dialogueData, setDialogueData] = useState<DialogueLine[] | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  // --- FUNÇÃO CENTRALIZADA PARA BUSCAR PERGUNTAS DA API ---
  const fetchNewQuestion = async (difficulty: 'normal' | 'hard' = 'normal') => {
    setIsLoading(true);
    try {
      const response = await api.get(`/questions/random?difficulty=${difficulty}`);
      setCurrentQuestion(response.data);
      setModifiedOptions(null); // Reseta as opções modificadas pela habilidade do Mago
    } catch (error) {
      console.error("Erro ao buscar nova pergunta:", error);
      setGameMessage("Não foi possível carregar a próxima pergunta.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- Funções de Lógica do Jogo ---
  const showGameMessage = (message: string) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(null), 3000);
  };

  const handleSelectClass = async (className: ClassName) => {
    const selectedClass = classDefinitions[className];
    if (!selectedClass) return;
    
    setPlayer({
      name: `Herói ${selectedClass.name}`,
      className: className,
      ...selectedClass.stats,
      abilityUsed: false,
      image: selectedClass.image,
      mana: 100, // Defina valores iniciais consistentes
      maxMana: 100,
    });

    await fetchNewQuestion(); // Busca a primeira pergunta
    setGameState('BATTLE');
  };

  const handleAnswer = async (selectedOption: string) => {
    if (!player || !currentQuestion || gameState !== 'BATTLE') return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Lógica de acerto (mantida da sua branch mais avançada)
      let damageDealt = player.damage;
      // ... (lógica de investida, bardo, etc.)
      setEnemy(e => ({ ...e, hp: Math.max(0, e.hp - damageDealt) }));
      showGameMessage("Correto! Você ataca.");
    } else {
      // Lógica de erro (mantida da sua branch mais avançada)
      if (player.shieldUp) {
        // ...
      } else {
        setPlayer(p => ({ ...p!, hp: Math.max(0, p!.hp - enemy.damage) }));
        showGameMessage("Errado! Você sofreu dano.");
      }
    }
    
    // Após o resultado, busca a próxima pergunta para o próximo turno
    if (enemy.hp > 0 && player.hp > 0) {
      await fetchNewQuestion();
    }
  };
  
  const handleUseAbility = async () => {
    // ... toda a sua lógica detalhada de habilidades por classe ...
    // Se a habilidade do Bardo for usada, ela deve chamar: await fetchNewQuestion('hard');
  };
  
  // --- Funções de Ações de Batalha ---
  const handleAttack = () => { /* ... sua lógica ... */ };
  const handleDefend = () => { /* ... sua lógica ... */ };
  const handleUseItem = () => { /* ... sua lógica ... */ };
  const handleFlee = () => { /* ... sua lógica ... */ };

  // --- Funções de Navegação e Diálogo ---
  const handleGoToMainMenu = () => setGameState('MAIN_MENU');
  const handleGoToMap = () => setGameState('MAP_VIEW');
  const handleStartNewGame = () => setGameState('CLASS_SELECTION');
  const goToClassSelection = () => { /* ... sua lógica de reset ... */ };
  const handlePauseGame = () => setGameState('PAUSE');
  const handleResumeGame = () => setGameState('BATTLE');
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
      setGameState('BATTLE');
    }
  };

  // --- Efeitos ---
  useEffect(() => {
    // Efeito de game over
    if (!player) return;
    if (enemy.hp <= 0) {
      setGameOverMessage("Você Venceu!");
      setGameState('GAME_OVER');
    } else if (player.hp <= 0) {
      setGameOverMessage("Você foi derrotado!");
      setGameState('GAME_OVER');
    }
  }, [player, enemy.hp]);
  
  useEffect(() => {
    // Efeito de atalhos de teclado (removida a dependência do appState)
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState === 'BATTLE') {
        // ... sua lógica de atalhos para P, I, O, Q, C, H ...
      }
      // ... sua lógica para fechar os modais ...
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, isInventoryOpen, isStatsOpen, isQuestsOpen, isCodexOpen, isConfirmationOpen]);

  
  return {
    // Retornamos apenas os estados e funções relacionadas AO JOGO
    gameState,
    player,
    enemy,
    currentQuestion,
    gameOverMessage,
    modifiedOptions,
    gameMessage,
    isLoading,
    handleSelectClass,
    handleAnswer,
    handleUseAbility,
    goToClassSelection,
    classDefinitions,
    isDefending,
    // Modais e UI
    isInventoryOpen, isStatsOpen, isQuestsOpen, isCodexOpen, isHelpOpen, isConfirmationOpen, isQuizOpen,
    handleOpenInventory: () => setIsInventoryOpen(true), handleCloseInventory: () => setIsInventoryOpen(false),
    handleOpenStats: () => setIsStatsOpen(true), handleCloseStats: () => setIsStatsOpen(false),
    handleOpenQuests: () => setIsQuestsOpen(true), handleCloseQuests: () => setIsQuestsOpen(false),
    handleOpenCodex: () => setIsCodexOpen(true), handleCloseCodex: () => setIsCodexOpen(false),
    handleOpenHelp: () => setIsHelpOpen(true), handleCloseHelp: () => setIsHelpOpen(false),
    handleOpenConfirmation: () => setIsConfirmationOpen(true), handleCloseConfirmation: () => setIsConfirmationOpen(false),
    onOpenQuiz: () => setIsQuizOpen(true), onCloseQuiz: () => setIsQuizOpen(false),
    // Ações de Batalha
    handleAttack, handleDefend, handleUseItem, handleFlee,
    // Diálogo
    dialogueData, currentDialogueIndex, currentDialogue: dialogueData ? dialogueData[currentDialogueIndex] : null,
    handleStartDialogue, handleAdvanceDialogue,
    // Pause
    handlePauseGame, handleResumeGame,
    // Navegação interna
    handleGoToMainMenu, handleGoToMap, handleStartNewGame,
  };
};