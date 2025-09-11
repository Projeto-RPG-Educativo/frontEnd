import React from 'react';
// import { Player, Enemy } from '../../GameDataBank';
import 'HUD.css';

interface HUDProps {
  title: string;
  hp: number;
  maxHp: number;
  isPlayer?: boolean;
}

const HUD: React.FC<HUDProps> = ({ title, hp, maxHp, isPlayer }) => {
  return (
    <div className="hud-card">
      <h2>{title}</h2>
      <progress value={hp} max={maxHp} className={isPlayer ? 'player-hp' : 'enemy-hp'}></progress>
      <p>HP: {hp} / {maxHp}</p>
    </div>
  );
};

export default HUD;