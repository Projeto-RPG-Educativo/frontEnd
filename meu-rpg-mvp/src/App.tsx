//Importações essenciais do React e do nosso arquivo de CSS
import { useState, useEffect } from 'react';
import './App.css';

//Interfaces (Nossos "contratos" para os objetos do jogo)
type ClassName = 'Tank' | 'Mago' | 'Lutador' | 'Ladino' | 'Paladino' | 'Bardo';

interface Player {
  name: string;
  className: ClassName;
  hp: number;
  maxHp: number;
  damage: number;
  abilityUsed: boolean;
  // Propriedades específicas de habilidades
  shieldUp?: boolean;
  investidaActive?: boolean;
}

interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  damage: number;
}

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'normal' | 'hard';
}

//Definição das Classes e Banco de Perguntas

//Objeto com as definições de cada classe
const classDefinitions = {
  Tank: { name: 'Tank', description: 'EU AGUENTO - Levanta um escudo que bloqueia o próximo ataque ao errar.', stats: { hp: 150, maxHp: 150, damage: 15 } },
  Mago: { name: 'Mago', description: 'CLARIVIDÊNCIA - Usa magia para eliminar uma das respostas incorretas.', stats: { hp: 100, maxHp: 100, damage: 25 } },
  Lutador: { name: 'Lutador', description: 'INVESTIDA - Prepara um ataque poderoso que causa dano extra no próximo acerto.', stats: { hp: 120, maxHp: 120, damage: 20 } },
  Ladino: { name: 'Ladino', description: 'ROUBO - Usa sua astúcia para conseguir uma dica sobre a resposta.', stats: { hp: 110, maxHp: 110, damage: 20 } },
  Paladino: { name: 'Paladino', description: 'CURA - Invoca a luz para recuperar 30 pontos de vida.', stats: { hp: 130, maxHp: 130, damage: 18 } },
  Bardo: { name: 'Bardo', description: 'LÁBIA - Tenta confundir o inimigo com uma pergunta muito difícil. Se acertar, vence o combate instantaneamente.', stats: { hp: 100, maxHp: 100, damage: 15 } },
};

//Banco de dados de perguntas do nosso MVP
const questionsDb: Question[] = [
  { text: "She ___ a doctor.", options: ["is", "are", "am"], correctAnswer: "is", difficulty: 'normal' },
  { text: "They ___ from Canada.", options: ["is", "are", "am"], correctAnswer: "are", difficulty: 'normal' },
  { text: "What time ___ it?", options: ["is", "are", "be"], correctAnswer: "is", difficulty: 'normal' },
  { text: "I ___ watching TV right now.", options: ["is", "are", "am"], correctAnswer: "am", difficulty: 'normal' },
  //Pergunta difícil para o Bardo
  { text: "___ you ever ___ to Japan?", options: ["Have / been", "Has / been", "Did / went"], correctAnswer: "Have / been", difficulty: 'hard' },
];


//O componente principal do jogo
function App() {
  //Estado para controlar a tela atual do jogo
  const [gameState, setGameState] = useState<'CLASS_SELECTION' | 'BATTLE' | 'GAME_OVER'>('CLASS_SELECTION');
  
  //Estado para guardar os dados do jogador (começa como nulo)
  const [player, setPlayer] = useState<Player | null>(null);

  //Estado para controlar o inimigo
  const [enemy, setEnemy] = useState<Enemy>({
    name: "Goblin da Gramática",
    hp: 100,
    maxHp: 100,
    damage: 20,
  });

  //Estado para controlar a pergunta atual
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(questionsDb[0]);
  
  //Estado para a mensagem de fim de jogo
  const [gameOverMessage, setGameOverMessage] = useState<string>('');
  
  //Estado para as opções modificadas pela habilidade do Mago
  const [modifiedOptions, setModifiedOptions] = useState<string[] | null>(null);


  //Efeito que verifica a condição de vitória ou derrota
  useEffect(() => {
    if (!player) return; // Não faz nada se o jogador ainda não foi criado

    if (enemy.hp === 0) {
      setGameOverMessage("Você Venceu! O Goblin da Gramática foi derrotado!");
      setGameState('GAME_OVER');
    } else if (player.hp === 0) {
      setGameOverMessage("Você foi derrotado! Tente novamente.");
      setGameState('GAME_OVER');
    }
  }, [player, enemy.hp]);

  //Função para selecionar a classe e iniciar o jogo
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

  //Função para usar a habilidade da classe
  const handleUseAbility = () => {
    if (!player || player.abilityUsed) return;

    setPlayer(p => ({ ...p!, abilityUsed: true }));

    switch (player.className) {
      case 'Tank':
        setPlayer(p => ({ ...p!, shieldUp: true }));
        alert("Escudo levantado! O próximo erro será bloqueado.");
        break;
      case 'Mago':
        const incorrectOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correctAnswer);
        const optionToRemove = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];
        setModifiedOptions(currentQuestion.options.filter(opt => opt !== optionToRemove));
        alert(`Clarividência! A opção "${optionToRemove}" foi eliminada.`);
        break;
      case 'Lutador':
        setPlayer(p => ({ ...p!, investidaActive: true }));
        alert("Investida preparada! Seu próximo acerto causará dano extra.");
        break;
      case 'Ladino':
        const hintOptions = currentQuestion.options.filter(opt => opt !== currentQuestion.correctAnswer);
        alert(`Dica do Ladino: A resposta NÃO é "${hintOptions[0]}"!`);
        break;
      case 'Paladino':
        setPlayer(p => ({ ...p!, hp: Math.min(p!.maxHp, p!.hp + 30) }));
        alert("Cura! Você recuperou 30 pontos de vida.");
        break;
      case 'Bardo':
        const hardQuestion = questionsDb.find(q => q.difficulty === 'hard');
        if (hardQuestion) {
          setCurrentQuestion(hardQuestion);
          alert("Lábia! Você trocou a pergunta por um desafio de vida ou morte!");
        }
        break;
    }
  };

  //Função para lidar com a resposta do jogador
  const handleAnswer = (selectedOption: string) => {
    if (gameState !== 'BATTLE') return;

    const isCorrect = selectedOption === currentQuestion.correctAnswer;

    if (isCorrect) {
      // Lógica de acerto
      let damageDealt = player!.damage;
      if (player?.investidaActive) {
        damageDealt *= 2; // Dobro do dano com a investida
        setPlayer(p => ({ ...p!, investidaActive: false })); // Consome a investida
        alert("Correto! Sua investida causou dano massivo!");
      } else {
        alert("Correto! Você ataca.");
      }
      
      if (player?.className === 'Bardo' && currentQuestion.difficulty === 'hard') {
        alert("Incrível! Sua lábia funcionou e você venceu o combate!");
        setEnemy(e => ({...e, hp: 0}));
        return;
      }

      setEnemy(e => ({ ...e, hp: Math.max(0, e.hp - damageDealt) }));

    } else {
      //Lógica de erro
      alert("Errado! Você sofre dano.");
      if (player?.shieldUp) {
        setPlayer(p => ({ ...p!, shieldUp: false }));
        alert("Seu escudo absorveu o dano!");
      } else {
        setPlayer(p => ({ ...p!, hp: Math.max(0, p!.hp - enemy.damage) }));
      }
    }

    //Passa para a próxima pergunta normal
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questionsDb.filter(q => q.difficulty === 'normal').length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      setCurrentQuestion(questionsDb[nextQuestionIndex]);
      setModifiedOptions(null); // Reseta as opções do mago
    } else {
       if (enemy.hp > 0) {
         setGameOverMessage("Você ficou sem perguntas e não conseguiu derrotar o inimigo!");
         setGameState('GAME_OVER');
       }
    }
  };
  
  //Função para reiniciar o jogo
  const restartGame = () => {
    setGameState('CLASS_SELECTION');
    setPlayer(null);
    setEnemy({ name: "William Shakespeare", hp: 100, maxHp: 100, damage: 20 });
    setCurrentQuestionIndex(0);
    setCurrentQuestion(questionsDb[0]);
    setGameOverMessage('');
    setModifiedOptions(null);
  };

  // Renderização condicional baseada no estado do jogo
  return (
    <div className="game-container">
      {/* TELA DE SELEÇÃO DE CLASSE */}
      {gameState === 'CLASS_SELECTION' && (
        <div className="class-selection-screen">
          <h1>Escolha sua Classe</h1>
          <div className="class-cards-container">
            {Object.values(classDefinitions).map(cls => (
              <div key={cls.name} className="class-card" onClick={() => handleSelectClass(cls.name as ClassName)}>
                <h2>{cls.name}</h2>
                <p>{cls.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TELA DE BATALHA */}
      {gameState === 'BATTLE' && player && (
        <div className="battle-screen">
          <div className="hud enemy-hud">
            <h2>{enemy.name}</h2>
            <progress value={enemy.hp} max={enemy.maxHp}></progress>
            <p>HP: {enemy.hp} / {enemy.maxHp}</p>
          </div>

          <div className="hud player-hud">
            <h2>{player.name} ({player.className})</h2>
            <progress value={player.hp} max={player.maxHp}></progress>
            <p>HP: {player.hp} / {player.maxHp}</p>
            {player.shieldUp && <p>🛡️ Escudo Ativo!</p>}
            {player.investidaActive && <p>🔥 Investida Pronta!</p>}
          </div>
          
          <div className="question-box">
            <h3>{currentQuestion.text}</h3>
            <div className="options-container">
              {(modifiedOptions || currentQuestion.options).map((option) => (
                <button key={option} onClick={() => handleAnswer(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="ability-box">
            <button onClick={handleUseAbility} disabled={player.abilityUsed}>
              {player.abilityUsed ? 'Habilidade Usada' : `Usar Habilidade: ${classDefinitions[player.className].name}`}
            </button>
          </div>
        </div>
      )}

      {/* TELA DE FIM DE JOGO */}
      {gameState === 'GAME_OVER' && (
        <div className="game-over-box">
          <h2>{gameOverMessage}</h2>
          <button onClick={restartGame}>Jogar Novamente</button>
        </div>
      )}
    </div>
  );
}

export default App;
