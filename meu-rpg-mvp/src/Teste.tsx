import { useState, useEffect } from 'react';
import api from './services/api'; // Usando nossa API centralizada
import {
  classDefinitions,
  type ClassName,
  type Player,
  type Enemy,
  type Question,
} from './data/GameDataBank'; // Mantemos os dados das classes estáticos por enquanto
import GoblinEstudado from './assets/GoblinEstudado.png';

// NOTA: As perguntas (questionsDb) não são mais importadas daqui.

interface DialogueLine {
  character: string;
  text: string;
}

export const useGameLogic = () => {
  // --- Estados do Jogo ---
  const [gameState, setGameState] = useState<'MAIN_MENU' | 'MAP_VIEW' | 'CLASS_SELECTION' | 'BATTLE' | 'GAME_OVER' | 'DIALOGUE'>('MAIN_MENU');
  const [player, setPlayer] = useState<Player | null>(null);
  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin da Gramática",
    hp: 100,
    maxHp: 100,
    damage: 20,
    // Adicione as propriedades que faltam:
    mana: 100,
    maxMana: 100,
    image: GoblinEstudado, // Use a imagem importada
});
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);
  const [gameMessage, setGameMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  
  // --- Estados do Diálogo ---
  const [dialogueData, setDialogueData] = useState<DialogueLine[] | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  // --- FUNÇÃO NOVA: Para buscar perguntas da API ---
  const fetchNewQuestion = async (difficulty: 'normal' | 'hard' = 'normal') => {
    try {
      const response = await api.get(`/questions/random?difficulty=${difficulty}`);
      setCurrentQuestion(response.data);
      setModifiedOptions(null); // Reseta as opções modificadas
    } catch (error) {
      console.error("Erro ao buscar nova pergunta:", error);
      setGameMessage("Não foi possível carregar a próxima pergunta.");
    }
  };

  // --- Funções de Lógica do Jogo ---
  const showGameMessage = (message: string) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(null), 3000);
  };

  // ALTERADO: Agora busca a primeira pergunta antes de iniciar o jogo
  const handleSelectClass = async (className: ClassName) => {
    const selectedClass = classDefinitions[className];
    if (!selectedClass) return;

    await fetchNewQuestion(); // Busca a primeira pergunta

    setPlayer({
    name: `Herói ${selectedClass.name}`,
    className: className,
    ...selectedClass.stats,
    abilityUsed: false,
    
    // Adicione as propriedades que faltam:
    mana: 100, // ou um valor inicial que fizer sentido
    maxMana: 100,
    image: selectedClass.image, // A imagem vem da definição da classe
  });

    setGameState('BATTLE');
  };

  // ALTERADO: Agora busca a próxima pergunta após a resposta
  const handleAnswer = async (selectedOption: string) => {
    if (!player || !currentQuestion || gameState !== 'BATTLE') return;
    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      let damageDealt = player.damage;
      if (player.investidaActive) {
        damageDealt *= 2;
        setPlayer(p => ({ ...p!, investidaActive: false }));
        showGameMessage("Correto! Sua investida causou dano massivo!");
      } else {
        showGameMessage("Correto! Você ataca.");
      }
      
      if (player.className === 'Bardo' && currentQuestion.difficulty === 'hard') {
        showGameMessage("Incrível! Sua lábia funcionou e você venceu o combate!");
        setEnemy(e => ({...e, hp: 0}));
        return; // Finaliza o turno aqui
      }
      setEnemy(e => ({ ...e, hp: Math.max(0, e.hp - damageDealt) }));
    } else {
      if (player.shieldUp) {
        setPlayer(p => ({ ...p!, shieldUp: false }));
        showGameMessage("Seu escudo absorveu o dano!");
      } else {
        setPlayer(p => ({ ...p!, hp: Math.max(0, p!.hp - enemy.damage) }));
        showGameMessage("Errado! Você sofreu dano.");
      }
    }
    
    // Após o resultado, busca a próxima pergunta para o próximo turno
    if (enemy.hp > 0) {
      await fetchNewQuestion();
    }
  };

  // ALTERADO: Habilidade do Bardo agora também busca da API
  const handleUseAbility = async () => {
    if (!player || player.abilityUsed) return;
    setPlayer(p => ({ ...p!, abilityUsed: true }));

    switch (player.className) {
      // Casos do Tank, Mago, Lutador, Ladino, Paladino (mantidos)
      case 'Tank': /* ... */ break;
      case 'Mago': /* ... */ break;
      case 'Lutador': /* ... */ break;
      case 'Ladino': /* ... */ break;
      case 'Paladino': /* ... */ break;
      case 'Bardo':
        showGameMessage("Lábia! Você trocou a pergunta por um desafio de vida ou morte!");
        await fetchNewQuestion('hard'); // Busca uma pergunta difícil
        break;
    }
  };

  // --- Funções de Navegação e Diálogo (Preservadas) ---
  const goToSettings = () => setShowSettings(true);
  const handleGoToMainMenu = () => { /* Esta função pode precisar ser movida para o App.tsx com o AuthContext */ setGameState('MAIN_MENU'); };
  const handleGoToMap = () => setGameState('MAP_VIEW');
  const handleStartNewGame = () => setGameState('CLASS_SELECTION');
  const goToClassSelectionFromMenu = () => setGameState('CLASS_SELECTION');
  const goToClassSelection = () => { /* ... sua lógica de reset ... */ };
  const handleStartDialogue = (dialogues: DialogueLine[]) => { /* ... sua lógica ... */ };
  const handleAdvanceDialogue = () => { /* ... sua lógica ... */ };

  // Efeito de fim de jogo (Preservado)
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

  return {
    gameState,
    player,
    enemy,
    currentQuestion,
    gameOverMessage,
    modifiedOptions,
    gameMessage,
    showSettings,
    handleSelectClass,
    handleUseAbility,
    handleAnswer,
    goToClassSelection,
    classDefinitions,
    goToClassSelectionFromMenu,
    goToSettings,
    handleGoToMainMenu,
    handleGoToMap,
    handleStartNewGame,
    handleStartDialogue,
    dialogueData,
    handleAdvanceDialogue,
  };
};