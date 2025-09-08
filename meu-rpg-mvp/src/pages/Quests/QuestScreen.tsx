import React from 'react';
import { motion } from 'framer-motion';
import './QuestScreen.css';

interface Quest {
    id: number;
    title: string;
    description: string;
    status: 'Completa' | 'Ativa';
}

// Dados de exemplo de missões
const sampleQuests: Quest[] = [
    {
        id: 1,
        title: 'A Gramática do Mal',
        description: 'Derrote o Goblin da Gramática respondendo corretamente às perguntas.',
        status: 'Ativa',
    },
    {
        id: 2,
        title: 'A Floresta dos Sinais',
        description: 'Encontre 5 sinais de pontuação perdidos na floresta do jogo.',
        status: 'Ativa',
    },
    {
        id: 3,
        title: 'O Conhecimento Ancestral',
        description: 'Responda a 10 perguntas sobre a história do reino.',
        status: 'Completa',
    },
];

interface QuestScreenProps {
    onClose: () => void;
}

const QuestScreen: React.FC<QuestScreenProps> = ({ onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="quest-screen"
        >
            <div className="quest-header">
                <h1>Missões</h1>
                <button className="quest-close-button" onClick={onClose}>X</button>
            </div>
            <div className="quest-list">
                {sampleQuests.map(quest => (
                    <div key={quest.id} className={`quest-item quest-${quest.status.toLowerCase()}`}>
                        <h2>{quest.title}</h2>
                        <p>{quest.description}</p>
                        <span className="quest-status">Status: {quest.status}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestScreen;
