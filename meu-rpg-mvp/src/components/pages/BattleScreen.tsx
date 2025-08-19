import React from 'react';
import { type Player, type Enemy, type Question, type ClassName, classDefinitions } from '../../GameDataBank';
import Layout from '../Layout/Layout';

interface BattleScreenProps {
  player: Player;
  enemy: Enemy;
  currentQuestion: Question;
  modifiedOptions: string[] | null;
  gameMessage: string | null;
  onAnswer: (selectedOption: string) => void;
  onUseAbility: () => void;
  classDefinitions: { [key in ClassName]: { name: string; description: string } };
}

const BattleScreen: React.FC<BattleScreenProps> = ({
  player,
  enemy,
  currentQuestion,
  modifiedOptions,
  gameMessage,
  onAnswer,
  onUseAbility,
}) => {
  return (
    <Layout>
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
      
      {gameMessage && <div className="game-message-box"><p>{gameMessage}</p></div>}
      
      <div className="question-box">
        <h3>{currentQuestion.text}</h3>
        <div className="options-container">
          {(modifiedOptions || currentQuestion.options).map((option) => (
            <button key={option} onClick={() => onAnswer(option)}>
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="ability-box">
        <button onClick={onUseAbility} disabled={player.abilityUsed}>
          {player.abilityUsed ? 'Habilidade Usada' : `Usar Habilidade: ${classDefinitions[player.className].name}`}
        </button>
      </div>
    </div>
    </Layout>
  );
};

export default BattleScreen;