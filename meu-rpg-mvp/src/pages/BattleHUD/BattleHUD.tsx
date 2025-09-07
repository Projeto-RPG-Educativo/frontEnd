import React from 'react';
import './BattleHUD.css';

interface BattleHUDProps {
  name: string;
  hp: number;
  maxHp: number;
  mana?: number;
  maxMana?: number;
}

const BattleHUD: React.FC<BattleHUDProps> = ({ name, hp, maxHp, mana, maxMana }) => {
  const hpPercentage = (hp / maxHp) * 100;
  const manaPercentage = mana && maxMana ? (mana / maxMana) * 100 : 0;

  return (
    <div className="battle-hud">
      <h2 className="hud-name">{name}</h2>
      <div className="hud-stats">
        <div className="hud-bar-container">
          <div className="hud-bar hp-bar" style={{ width: `${hpPercentage}%` }}></div>
        </div>
        <p className="hud-text">HP: {hp} / {maxHp}</p>
        {mana !== undefined && (
          <>
            <div className="hud-bar-container">
              <div className="hud-bar mana-bar" style={{ width: `${manaPercentage}%` }}></div>
            </div>
            <p className="hud-text">Mana: {mana} / {maxMana}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default BattleHUD;