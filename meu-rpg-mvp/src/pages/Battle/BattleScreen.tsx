import React, { useEffect } from 'react';
import { type Player, type Enemy, type Question, type ClassName, classDefinitions } from '../../GameDataBank';
import type { DialogueLine } from '../../GameDataBank';
import './BattleScreen.css';
import BattleHUD from './BattleHUD';

interface BattleScreenProps {
  player: Player;
  enemy: Enemy;
  currentQuestion: Question;
  modifiedOptions: string[] | null;
  gameMessage: string | null;
  onAnswer: (selectedOption: string) => void;
  onUseAbility: () => void;
  classDefinitions: { [key in ClassName]: { name: string; description: string } };
  onGoToMenu: () => void;
  onStartDialogue: (dialogues: DialogueLine[], nextState: "BATTLE" | "GAME_OVER") => void;
  onPauseGame: () => void;
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  player,
  enemy,
  currentQuestion,
  modifiedOptions,
  gameMessage,
  onAnswer,
  onUseAbility,
  onGoToMenu,
  classDefinitions,
  onStartDialogue,
  onPauseGame,
}) => {
  // Lógica para o ouvinte de teclado 'P'
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'p' || event.key === 'P') {
        onPauseGame();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onPauseGame]);

  return (
    <div className="battle-screen">

      <div className="battle-header">
        <div className="battle-top-left">
          <div className="question-box">
            <p>{currentQuestion.text}</p>
          </div>

          <div className="options-container">
            {(modifiedOptions || currentQuestion.options).map((option, index) => (
              <button key={index} onClick={() => onAnswer(option)}>
                {option}
              </button>
            ))} 
          <div className="game-message">{gameMessage}</div>
          </div>
        </div>
        <BattleHUD name={enemy.name} hp={enemy.hp} maxHp={enemy.maxHp} />
      </div>

      {/* Área central do jogo (onde a pergunta aparece) */}
      <div className="battle-center">
      </div>

      {/* Botões e HUDs na parte de baixo */}
      <div className="battle-bottom">
        <div className="ability-box">
          <button onClick={onUseAbility} disabled={player.abilityUsed}>
            {player.abilityUsed ? 'Habilidade Usada' : `Usar Habilidade: ${classDefinitions[player.className].name}`}
          </button>
          <button onClick={() => onStartDialogue([{ speaker: "Herói", text: "Isso é um teste de diálogo." }], 'BATTLE')}>dialogo teste</button>
          <button onClick={onPauseGame}>Pausar Jogo</button>
          <button onClick={onGoToMenu}>Voltar ao Menu</button>
        </div>
        <BattleHUD name={player.name} hp={player.hp} maxHp={player.maxHp} />
      </div>

    </div>
  );
};

export default BattleScreen;