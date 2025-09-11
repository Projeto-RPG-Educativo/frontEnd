// GameDataBank.ts

// --- Imports de Imagens ---
import Tank from '../assets/Tank.jpg'
import Mage from '../assets/Mage.jpg';
import Fighter from '../assets/Fighter.jpg';
import Rogue from '../assets/Rogue.jpg';
import Paladin from '../assets/Paladin.jpg';
import Bard from '../assets/Bard.jpg';
// import GoblinImage from './assets/goblin.png'; adicionar nos assets uma imagem pro vilao

// --- Interfaces de Dados ---
export type ClassName = 'Tank' | 'Mago' | 'Lutador' | 'Ladino' | 'Paladino' | 'Bardo';

export interface Player {
  name: string;
  className: ClassName;
  hp: number;
  maxHp: number;
  mana: number;
  maxMana: number;
  damage: number;
  abilityUsed: boolean;
  image: string; // Adicionado: URL da imagem do jogador
  
  // Propriedades específicas de habilidades
  shieldUp?: boolean;
  investidaActive?: boolean;
}

export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  damage: number;
  mana: number;
  maxMana: number;
  image: string; // Adicionado: URL da imagem do inimigo
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'normal' | 'hard';
}

export interface DialogueLine {
  speaker: string;
  text: string;
}

// --- Definição das Classes de Personagem ---
export const classDefinitions = {
  Tank: {
    name: 'Tank',
    description: 'EU AGUENTO - Levanta um escudo que bloqueia o próximo ataque ao errar.',
    stats: { hp: 150, maxHp: 150, damage: 15 },
    image: Tank,
    ability: 'Escudo levantado! O próximo erro será bloqueado.',
  },
  Mago: {
    name: 'Mago',
    description: 'CLARIVIDÊNCIA - Usa magia para eliminar uma das respostas incorretas.',
    stats: { hp: 100, maxHp: 100, damage: 25 },
    image: Mage,
    ability: 'Clarividência! A opção foi eliminada.',
  },
  Lutador: {
    name: 'Lutador',
    description: 'INVESTIDA - Prepara um ataque poderoso que causa dano extra no próximo acerto.',
    stats: { hp: 120, maxHp: 120, damage: 20 },
    image: Fighter,
    ability: 'Investida preparada! Seu próximo acerto causará dano extra.',
  },
  Ladino: {
    name: 'Ladino',
    description: 'ROUBO - Usa sua astúcia para conseguir uma dica sobre a resposta.',
    stats: { hp: 110, maxHp: 110, damage: 20 },
    image: Rogue,
    ability: 'Dica do Ladino: A resposta NÃO é...',
  },
  Paladino: {
    name: 'Paladino',
    description: 'CURA - Invoca a luz para recuperar 30 pontos de vida.',
    stats: { hp: 130, maxHp: 130, damage: 18 },
    image: Paladin,
    ability: 'Cura! Você recuperou 30 pontos de vida.',
  },
  Bardo: {
    name: 'Bardo',
    description: 'LÁBIA - Tenta confundir o inimigo com uma pergunta muito difícil. Se acertar, vence o combate instantaneamente.',
    stats: { hp: 100, maxHp: 100, damage: 15 },
    image: Bard,
    ability: 'Lábia! Você trocou a pergunta por um desafio de vida ou morte!',
  },
};

// --- Banco de Dados de Perguntas ---
export const QuestionsDb: Question[] = [
  { text: "She ___ a doctor.", options: ["is", "are", "am"], correctAnswer: "is", difficulty: 'normal' },
  { text: "They ___ from Canada.", options: ["is", "are", "am"], correctAnswer: "are", difficulty: 'normal' },
  { text: "What time ___ it?", options: ["is", "are", "be"], correctAnswer: "is", difficulty: 'normal' },
  { text: "I ___ watching TV right now.", options: ["is", "are", "am"], correctAnswer: "am", difficulty: 'normal' },
  { text: "___ you ever ___ to Japan?", options: ["Have / been", "Has / been", "Did / went"], correctAnswer: "Have / been", difficulty: 'hard' },
];

// --- Configurações de Diálogo ---
export const initialDialogues = {
  intro: [
    { speaker: "Herói", text: "Bem-vindo ao reino da gramática! Preparado para o desafio?" },
    { speaker: "Goblin", text: "Grrr! Sou o Goblin da Gramática! Tente me derrotar, se puder!" },
  ],
  playerVictory: [
    { speaker: "Herói", text: "A vitória é minha! Minha gramática é impecável!" },
    { speaker: "Goblin", text: "Não... impossível! Minha gramática... falhou..." },
  ],
  playerDefeat: [
    { speaker: "Goblin", text: "Hahaha! Você não tem a menor chance contra a minha sintaxe perfeita!" },
    { speaker: "Herói", text: "Aaaargh... que dor..." },
  ],
};