export type ClassName = 'Tank' | 'Mago' | 'Lutador' | 'Ladino' | 'Paladino' | 'Bardo';

export interface Player {
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

export interface Enemy {
  name: string;
  hp: number;
  maxHp: number;
  damage: number;
}

export interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'normal' | 'hard';
}

// Definição das Classes e Banco de Perguntas
export const classDefinitions = {
  Tank: { name: 'Tank', description: 'EU AGUENTO - Levanta um escudo que bloqueia o próximo ataque ao errar.', stats: { hp: 150, maxHp: 150, damage: 15 } },
  Mago: { name: 'Mago', description: 'CLARIVIDÊNCIA - Usa magia para eliminar uma das respostas incorretas.', stats: { hp: 100, maxHp: 100, damage: 25 } },
  Lutador: { name: 'Lutador', description: 'INVESTIDA - Prepara um ataque poderoso que causa dano extra no próximo acerto.', stats: { hp: 120, maxHp: 120, damage: 20 } },
  Ladino: { name: 'Ladino', description: 'ROUBO - Usa sua astúcia para conseguir uma dica sobre a resposta.', stats: { hp: 110, maxHp: 110, damage: 20 } },
  Paladino: { name: 'Paladino', description: 'CURA - Invoca a luz para recuperar 30 pontos de vida.', stats: { hp: 130, maxHp: 130, damage: 18 } },
  Bardo: { name: 'Bardo', description: 'LÁBIA - Tenta confundir o inimigo com uma pergunta muito difícil. Se acertar, vence o combate instantaneamente.', stats: { hp: 100, maxHp: 100, damage: 15 } },
};

// Banco de dados de perguntas do nosso MVP
export const questionsDb: Question[] = [
  { text: "She ___ a doctor.", options: ["is", "are", "am"], correctAnswer: "is", difficulty: 'normal' },
  { text: "They ___ from Canada.", options: ["is", "are", "am"], correctAnswer: "are", difficulty: 'normal' },
  { text: "What time ___ it?", options: ["is", "are", "be"], correctAnswer: "is", difficulty: 'normal' },
  { text: "I ___ watching TV right now.", options: ["is", "are", "am"], correctAnswer: "am", difficulty: 'normal' },
  // Pergunta difícil para o Bardo
  { text: "___ you ever ___ to Japan?", options: ["Have / been", "Has / been", "Did / went"], correctAnswer: "Have / been", difficulty: 'hard' },
];