import React from 'react';
import { type Player, type Enemy, type Question, classDefinitions } from '../../data/GameDataBank';
import './BattleScreen.css';
import BattleHUD from '../BattleHUD/BattleHUD'; // Corrigido o caminho do import

// O tipo para a linha de diálogo
interface DialogueLine {
  speaker: string;
  text: string;
}

// A interface de props completa e correta
interface BattleScreenProps {
  player: Player;
  enemy: Enemy;
  currentQuestion: Question;
  gameMessage: string | null;
  modifiedOptions: string[] | null;
  classDefinitions: typeof classDefinitions;
  isQuizOpen: boolean;
  onStartDialogue: (dialogues: DialogueLine[], nextState: 'BATTLE' | 'GAME_OVER') => void;
  onAnswer: (selectedOption: string) => void;
  onUseAbility: () => void;
  onGoToMenu: () => void;
  handleAttack: () => void;
  handleDefend: () => void;
  handleUseItem: () => void;
  handleFlee: () => void;
  onPauseGame: () => void;
  onOpenQuiz: () => void;
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
  handleAttack,
  handleDefend,
  handleUseItem,
  handleFlee,
  onPauseGame,
}) => {
  
  return (
    <div className="battle-screen">
      <div className="battle-header">
        {/* Lado Esquerdo Superior: Inimigo */}
        <div className="battle-hud-container enemy-hud">
          <BattleHUD name={enemy.name} hp={enemy.hp} maxHp={enemy.maxHp} />
        </div>
        {/* Lado Direito Superior: Jogador */}
        <div className="battle-hud-container player-hud">
          <BattleHUD name={player.name} hp={player.hp} maxHp={player.maxHp} mana={player.mana} maxMana={player.maxMana} />
        </div>
      </div>

      {/* Área Central: Pergunta, Mensagens e Personagens */}
      <div className="battle-center">
        <div className="question-box">
          <p>{currentQuestion?.text || "Carregando pergunta..."}</p>
        </div>
        <div className="character-sprites">
          <img src={player.image} alt="Player" className="sprite player-sprite" />
          <img src={enemy.image} alt="Enemy" className="sprite enemy-sprite" />
        </div>
        {gameMessage && <div className="game-message">{gameMessage}</div>}
      </div>

      {/* Área Inferior: Opções e Ações */}
      <div className="battle-bottom">
        <div className="options-container">
          {(modifiedOptions || currentQuestion?.options || []).map((option, index) => (
            <button key={index} className="option-button" onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))}
        </div>

        <div className="actions-container">
          <button className="action-button attack" onClick={handleAttack}>Atacar</button>
          <button className="action-button defend" onClick={handleDefend}>Defender</button>
          <button className="action-button item" onClick={handleUseItem}>Item</button>
          <button className="action-button ability" onClick={onUseAbility} disabled={player.abilityUsed}>
            {player.abilityUsed ? 'Habilidade Usada' : 'Habilidade'}
          </button>
          <button className="action-button flee" onClick={handleFlee}>Fugir</button>
        </div>
      </div>

      {/* Botão de Pausa (Opcional, pode ficar em outro lugar) */}
      <button className="pause-button" onClick={onPauseGame}>Pausar</button>
    </div>
  );
};

export default BattleScreen;