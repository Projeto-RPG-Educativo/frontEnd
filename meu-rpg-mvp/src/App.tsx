import { useState, useEffect } from 'react';
import {
  classDefinitions,
  type ClassName,
  type Player,
  type Enemy,
  type Question,
  questionsDb,
} from './GameDataBank';

import ClassSelectionScreen from './components/pages/ClassSelectionScreen';
import BattleScreen from './components/pages/BattleScreen';
import GameOverScreen from './components/pages/GameOverScreen';
import { FullscreenProvider } from './components/Layout/FullscreenContext';
import Layout from './components/Layout/Layout';

import './index.css';

// Componente principal que gerencia o estado e as telas do jogo.
const App: React.FC = () => {
  // Estado para controlar a tela atual do jogo
  const [gameState, setGameState] = useState<'CLASS_SELECTION' | 'BATTLE' | 'GAME_OVER'>('CLASS_SELECTION');
  
  // Estado para guardar os dados do jogador (começa como nulo)
  const [player, setPlayer] = useState<Player | null>(null);

  // Estado para controlar o inimigo
  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin da Gramática",
    hp: 100,
    maxHp: 100,
    damage: 20,
  });

  // Estado para controlar a pergunta atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(questionsDb[0]);
  
  // Estado para a mensagem de fim de jogo
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  
  // Estado para as opções modificadas pela habilidade do Mago
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);

  // Estado para exibir mensagens curtas ao jogador
  const [gameMessage, setGameMessage] = useState<string | null>(null);

  // Efeito que verifica a condição de vitória ou derrota
  useEffect(() => {
    if (!player) return; // Não faz nada se o jogador ainda não foi criado

    if (enemy.hp <= 0) {
      setGameOverMessage("Você Venceu! O Goblin da Gramática foi derrotado!");
      setGameState('GAME_OVER');
    } else if (player.hp <= 0) {
      setGameOverMessage("Você foi derrotado! Tente novamente.");
      setGameState('GAME_OVER');
    }
  }, [player, enemy.hp]);

  // Função para selecionar a classe e iniciar o jogo
  const handleSelectClass = (className: ClassName) => {
    const selectedClass = classDefinitions[className];
    setPlayer({
      name: `Herói ${selectedClass.name}`,
      className: className,
      ...selectedClass.stats,
      abilityUsed: false,
    });
    setGameState('BATTLE');
  };

  // Função para exibir uma mensagem temporária
  const showGameMessage = (message: string) => {
    setGameMessage(message);
    setTimeout(() => setGameMessage(null), 3000); // Remove a mensagem após 3 segundos
  };

  // Função para usar a habilidade da classe
  const handleUseAbility = () => {
    if (!player || player.abilityUsed) return;

    setPlayer(p => ({ ...p!, abilityUsed: true }));

    switch (player.className) {
      case 'Tank':
        setPlayer(p => ({ ...p!, shieldUp: true }));
        showGameMessage("Escudo levantado! O próximo erro será bloqueado.");
        break;
      case 'Mago':
        const incorrectOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correctAnswer);
        const optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setModifiedOptions(currentQuestion.options.filter(opt => opt !== optionToRemove));
        showGameMessage(`Clarividência! A opção "${optionToRemove}" foi eliminada.`);
        break;
      case 'Lutador':
        setPlayer(p => ({ ...p!, investidaActive: true }));
        showGameMessage("Investida preparada! Seu próximo acerto causará dano extra.");
        break;
      case 'Ladino':
        const hintOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correctAnswer);
        showGameMessage(`Dica do Ladino: A resposta NÃO é "${hintOptions[0]}"!`);
        break;
      case 'Paladino':
        setPlayer(p => ({ ...p!, hp: Math.min(p!.maxHp, p!.hp + 30) }));
        showGameMessage("Cura! Você recuperou 30 pontos de vida.");
        break;
      case 'Bardo':
        const hardQuestion = questionsDb.find(q => q.difficulty === 'hard');
        if (hardQuestion) {
          setCurrentQuestion(hardQuestion);
          showGameMessage("Lábia! Você trocou a pergunta por um desafio de vida ou morte!");
        }
        break;
    }
  };

  // Função para lidar com a resposta do jogador
  const handleAnswer = (selectedOption: string) => {
    if (gameState !== 'BATTLE') return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Lógica de acerto
      let damageDealt = player!.damage;
      if (player?.investidaActive) {
        damageDealt *= 2; // Dobro do dano com a investida
        setPlayer(p => ({ ...p!, investidaActive: false })); // Consome a investida
        showGameMessage("Correto! Sua investida causou dano massivo!");
      } else {
        showGameMessage("Correto! Você ataca.");
      }
      
      if (player?.className === 'Bardo' && currentQuestion.difficulty === 'hard') {
        showGameMessage("Incrível! Sua lábia funcionou e você venceu o combate!");
        setEnemy(e => ({...e, hp: 0}));
        return;
      }

      setEnemy(e => ({ ...e, hp: Math.max(0, e.hp - damageDealt) }));

    } else {
      //Lógica de erro
      if (player?.shieldUp) {
        setPlayer(p => ({ ...p!, shieldUp: false }));
        showGameMessage("Seu escudo absorveu o dano!");
      } else {
        setPlayer(p => ({ ...p!, hp: Math.max(0, p!.hp - enemy.damage) }));
        showGameMessage("Errado! Você sofreu dano.");
      }
    }

    // Passa para a próxima pergunta normal
    const nextQuestionIndex = currentQuestionIndex + 1;
    const normalQuestions = questionsDb.filter(q => q.difficulty === 'normal');
    if (nextQuestionIndex < normalQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentQuestion(normalQuestions[nextQuestionIndex]);
      setModifiedOptions(null); // Reseta as opções do mago
    } else {
      if (enemy.hp > 0) {
        setGameOverMessage("Você ficou sem perguntas e não conseguiu derrotar o inimigo!");
        setGameState('GAME_OVER');
      }
    }
  };
  
  // Função para reiniciar o jogo
  const goToClassSelection = () => {
    setGameState('CLASS_SELECTION');
    setPlayer(null);
    setEnemy({ name: "Goblin da Gramática", hp: 100, maxHp: 100, damage: 20 });
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questionsDb[0]);
    setGameOverMessage('');
    setModifiedOptions(null);
    setGameMessage(null);
  };

  // Renderização condicional baseada no estado do jogo
  const renderGameScreen = () => {
    switch (gameState) {
      case 'CLASS_SELECTION':
        return <ClassSelectionScreen onSelectClass={handleSelectClass} />;
      case 'BATTLE':
        if (!player) return null; // Apenas para segurança
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
        <div className="app-container">{renderGameScreen()}</div>
      </Layout>
    </FullscreenProvider>
  );
}

export default App;